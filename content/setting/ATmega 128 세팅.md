## 포트
| PDx | pin | PCx | pin | PBx | pin |
| --- | --- | --- | --- | --- | --- |
| PD0 | IO0 | PC0 |     | PB0 | IO8 |
| PD1 | IO1 | PC1 |     | PB1 | IO9 |
| PD2 | IO2 | PC2 |     | PB2 |     |
| PD3 | IO3 | PC3 |     | PB3 |     |
| PD4 | IO4 | PC4 |     | PB4 |     |
| PD5 | IO5 | PC5 |     | PB5 |     |
| PD6 | IO6 |     |     |     |     |
| PD7 | IO7 |     |     |     |     |

## 코드
### 인터럽트


```c
//digital 입력 (input D3번핀, output D5 led 0.5->0.1, adc 4번 조도)
//아날로그 비교기
//ADC
//온도 검출
//EEPROM

#include <stdio.h>
#include <mega328p.h>
#include <delay.h>

// 전압
#define ADC_VREF_TYPE ((0<<REFS1) | (1<<REFS0) | (0<<ADLAR))
#define ADC_VREF_TYPE_TEMP ((1<<REFS1) | (1<<REFS0) | (0<<ADLAR))

/*
interrupt [ADC_INT] void adc_isr(void)
{
    unsigned int adc_data;
    int adc_volt;
    // Read the AD conversion result
    adc_data=ADCW;
    adc_volt = (int)(((float)adc_data/1024) * 5.0 * 100);
    printf("adc_volt = %d\r\n", adc_volt);
}
*/

unsigned int read_adc(unsigned char adc_input)
{
    ADMUX=adc_input | ADC_VREF_TYPE;
    delay_us(10);
    ADCSRA|=(1<<ADSC);
    while ((ADCSRA & (1<<ADIF))==0);
    ADCSRA|=(1<<ADIF);
    return ADCW;
}

unsigned int temp_adc(unsigned char adc_input)
{
    ADMUX=adc_input | ADC_VREF_TYPE_TEMP;
    delay_us(10);
    ADCSRA|=(1<<ADSC);
    while ((ADCSRA & (1<<ADIF))==0);
    ADCSRA|=(1<<ADIF);
    return ADCW;
}

int i, input, k_adc, adc_volt;

void main(void)
{
    #pragma optsize-
    CLKPR=(1<<CLKPCE);
    CLKPR=(0<<CLKPCE) | (0<<CLKPS3) | (0<<CLKPS2) | (0<<CLKPS1) | (0<<CLKPS0);
    #ifdef _OPTIMIZE_SIZE_
    #pragma optsize+
    #endif

    DDRD=(1<<DDD5) | (0<<DDD3);
    PORTD=(0<<PORTD5) | (0<<PORTD3);
    //3번 입력, 5번 출력


    //8data, 1stop, 9600(통신 방식)
    UCSR0A=(0<<RXC0) | (0<<TXC0) | (0<<UDRE0) | (0<<FE0) | (0<<DOR0) | (0<<UPE0) | (0<<U2X0) | (0<<MPCM0);
    UCSR0B=(0<<RXCIE0) | (0<<TXCIE0) | (0<<UDRIE0) | (1<<RXEN0) | (1<<TXEN0) | (0<<UCSZ02) | (0<<RXB80) | (0<<TXB80);
    UCSR0C=(0<<UMSEL01) | (0<<UMSEL00) | (0<<UPM01) | (0<<UPM00) | (0<<USBS0) | (1<<UCSZ01) | (1<<UCSZ00) | (0<<UCPOL0);
    UBRR0H=0x00;
    UBRR0L=0x67;

    ACSR=(0<<ACD) | (0<<ACBG) | (0<<ACO) | (0<<ACI) | (0<<ACIE) | (0<<ACIC) | (0<<ACIS1) | (0<<ACIS0);
    DIDR1=(0<<AIN0D) | (0<<AIN1D);


    ADCSRA=(1<<ADEN) | (0<<ADSC) | (0<<ADATE) | (0<<ADIF) | (0<<ADIE) | (0<<ADPS2) | (1<<ADPS1) | (1<<ADPS0);
    ADCSRB=(0<<ADTS2) | (0<<ADTS1) | (0<<ADTS0);

    DIDR0=(0<<ADC5D) | (0<<ADC4D) | (0<<ADC3D) | (0<<ADC2D) | (0<<ADC1D) | (0<<ADC0D);

    /*
    ADMUX=ADC_VREF_TYPE | 4;
    ADCSRA=(1<<ADEN) | (0<<ADSC) | (1<<ADATE) | (0<<ADIF) | (1<<ADIE) | (0<<ADPS2) | (1<<ADPS1) | (1<<ADPS0);
    ADCSRB=(0<<ADTS2) | (0<<ADTS1) | (0<<ADTS0);
    DIDR0=(0<<ADC5D) | (0<<ADC4D) | (0<<ADC3D) | (0<<ADC2D) | (0<<ADC1D) | (0<<ADC0D);
    ADCSRA|=(1<<ADSC);
    */


    SPCR=(0<<SPIE) | (0<<SPE) | (0<<DORD) | (0<<MSTR) | (0<<CPOL) | (0<<CPHA) | (0<<SPR1) | (0<<SPR0);

    TWCR=(0<<TWEA) | (0<<TWSTA) | (0<<TWSTO) | (0<<TWEN) | (0<<TWIE);

    /*
    //인터럽트 허용
    #asm("sei")
    */

    while (1)
    {
        input=PIND;
        printf("PIND : %d\r\n",input);
        for(i=0; i<10; i++)
        {
            if (PIND & 0x08)
            {
                PORTD.5=0;
                delay_ms(100);
                PORTD.5=1;
                delay_ms(100);
            }
            else
            {
                PORTD.5=0;
                delay_ms(500);
                PORTD.5=1;
                delay_ms(500);
            }
        }
        k_adc=temp_adc(8);
        adc_volt=((float)k_adc/1024)*1000;
        printf("adc_volt = %d\r\n",adc_volt);
    }
}
```

clock - 16Mhz =1/16e6
대략 625us

분주기 : 한 주기가 아닌 여러 주기를 한 주기처럼 사용


timer0 - 8bit
timer1 - 16bit

watchdog - 알람


nomal top=0xFF - 255주기가 돌 때의 시간

timevaule부터 FF까지 시간을 

CTC top OCR0A
```c
#include <mega328p.h>
#include <delay.h>
#include <stdio.h>

long int count_i,count_k;

interrupt [TIM0_OVF] void timer0_ovf_isr(void)
{
    TCNT0=0xF9;
    count_i ++;
    //타이머 클록이 249일때, 인터럽트
    if((count_i%22321)==0)
    {
        count_k++;
        printf("\r\n%ds",count_k*10);
    }
}


void main(void)
{
    #pragma optsize-
    CLKPR=(1<<CLKPCE);
    CLKPR=(0<<CLKPCE) | (0<<CLKPS3) | (0<<CLKPS2) | (0<<CLKPS1) | (0<<CLKPS0);
    #ifdef _OPTIMIZE_SIZE_
    #pragma optsize+
    #endif

    // Input/Output Ports initialization
    /*
    // Timer/Counter 0 initialization
    // Clock source: System Clock
    // Clock value: 15.625 kHz
    // Mode: CTC top=OCR0A
    // OC0A output: Disconnected
    // OC0B output: Disconnected
    // Timer Period: 16 ms
    TCCR0A=(0<<COM0A1) | (0<<COM0A0) | (0<<COM0B1) | (0<<COM0B0) | (1<<WGM01) | (0<<WGM00);
    TCCR0B=(0<<WGM02) | (1<<CS02) | (0<<CS01) | (1<<CS00);
    TCNT0=0xF9;
    OCR0A=0xF9;
    OCR0B=0x00;
    */

    // Timer/Counter 0 initialization
    // Clock source: System Clock
    // Clock value: 15.625 kHz
    // Mode: Normal top=0xFF
    // OC0A output: Disconnected
    // OC0B output: Disconnected
    // Timer Period: 0.448 ms
    TCCR0A=(0<<COM0A1) | (0<<COM0A0) | (0<<COM0B1) | (0<<COM0B0) | (0<<WGM01) | (0<<WGM00);
    TCCR0B=(0<<WGM02) | (1<<CS02) | (0<<CS01) | (1<<CS00);
    TCNT0=0xF9;
    OCR0A=0xF9;
    OCR0B=0x00;

    // Timer/Counter 0 Interrupt(s) initialization
    TIMSK0=(0<<OCIE0B) | (0<<OCIE0A) | (1<<TOIE0);

    //8data, 1stop, 9600(통신 방식)
    UCSR0A=(0<<RXC0) | (0<<TXC0) | (0<<UDRE0) | (0<<FE0) | (0<<DOR0) | (0<<UPE0) | (0<<U2X0) | (0<<MPCM0);
    UCSR0B=(0<<RXCIE0) | (0<<TXCIE0) | (0<<UDRIE0) | (1<<RXEN0) | (1<<TXEN0) | (0<<UCSZ02) | (0<<RXB80) | (0<<TXB80);
    UCSR0C=(0<<UMSEL01) | (0<<UMSEL00) | (0<<UPM01) | (0<<UPM00) | (0<<USBS0) | (1<<UCSZ01) | (1<<UCSZ00) | (0<<UCPOL0);
    UBRR0H=0x00;
    UBRR0L=0x67;

    // 전역으로 인터럽트 허용
    #asm("sei")

    count_k=count_i=0;

    while (1)
    {
        /*
        delay_ms(10000);
        i++;
        printf("\r\nTime:%d",i*10);
        */
        printf("\r\ntest interupt");
    }
}
```

```c
#include <mega328p.h>
#include <delay.h>
#include <string.h>
#include <stdio.h>

// ADC에 필요한 전압값
#define ADC_VREF_TYPE ((0<<REFS1) | (1<<REFS0) | (0<<ADLAR))
#define ADC_VREF_TYPE_TEMP ((1<<REFS1) | (1<<REFS0) | (0<<ADLAR))

//변수(추후 정리 예정)
int i,j,addre=40,data,mode,interupt_flag=0,sum=0,volt,temp;


//main문을 가볍게 하기 위해 동작들을 제어하는 함수
void activate();
//main문을 가볍게 하기 위해 따로 세팅값들을 처리하는 init함수
void init(void);
//매개변수로 받은 값만큼 LED를 껐다 키는 함수
void blink(int num);
//USART통신이나 출력은 정상 작동하나 입력에서 계행도 읽는 오류가 있어 scanf사용중
//그리고 문제 조건에 printf를 사용하라는 조건이 있기에 출력도 크게 사용 못함
int USART_send(char data);
int USART_receive(void);
//온도, 전압을 재는 ADC
unsigned int read_adc(unsigned char ch);
//디지털 0번의 전압이 현 세팅값, 전압을 받지 않을 때, 인터럽트 발생
interrupt [EXT_INT0] void ext_int0_isr(void);
//EEPROM에 값을 저장하고 출력하는 함수
void write(unsigned char data,unsigned int address);
unsigned char read(unsigned int address);


void main(void)
{

    init();
    activate();
}

void init(void)
{
    //클럭 세팅
     #pragma optsize-
    CLKPR=(1<<CLKPCE);
    CLKPR=(0<<CLKPCE) | (0<<CLKPS3) | (0<<CLKPS2) | (0<<CLKPS1) | (0<<CLKPS0);
    #ifdef _OPTIMIZE_SIZE_
    #pragma optsize+
    #endif

    //디지털 입출력; 현재 출력인 5번핀은 사용중
    DDRD=(1<<DDD5);
    PORTD=(0<<PORTD5);


    //interupt 세팅 high에서 low가 될 때, interupt 발생
    EICRA=(0<<ISC11) | (0<<ISC10) | (0<<ISC01) | (0<<ISC00);
    EIMSK=(0<<INT1) | (1<<INT0);
    EIFR=(1<<INTF1) | (0<<INTF0);
    PCICR=(0<<PCIE2) | (0<<PCIE1) | (0<<PCIE0);


    //8data, 1stop, 9600bit 터미널 통신이 필료한 세팅 값
    UCSR0A=(0<<RXC0) | (0<<TXC0) | (0<<UDRE0) | (0<<FE0) | (0<<DOR0) | (0<<UPE0) | (0<<U2X0) | (0<<MPCM0);
    UCSR0B=(0<<RXCIE0) | (0<<TXCIE0) | (0<<UDRIE0) | (1<<RXEN0) | (1<<TXEN0) | (0<<UCSZ02) | (0<<RXB80) | (0<<TXB80);
    UCSR0C=(0<<UMSEL01) | (0<<UMSEL00) | (0<<UPM01) | (0<<UPM00) | (0<<USBS0) | (1<<UCSZ01) | (1<<UCSZ00) | (0<<UCPOL0);
    UBRR0H=0x00;
    UBRR0L=0x67;

    //ADC 세팅
    ACSR=(1<<ACD) | (0<<ACBG) | (0<<ACO) | (0<<ACI) | (0<<ACIE) | (0<<ACIC) | (0<<ACIS1) | (0<<ACIS0);
    DIDR1=(0<<AIN0D) | (0<<AIN1D);
    ADCSRA=(1<<ADEN) | (0<<ADSC) | (0<<ADATE) | (0<<ADIF) | (0<<ADIE) | (1<<ADPS2) | (1<<ADPS1) | (1<<ADPS0);
    ADCSRB=(0<<ADTS2) | (0<<ADTS1) | (0<<ADTS0);
    DIDR0=(0<<ADC5D) | (0<<ADC4D) | (0<<ADC3D) | (0<<ADC2D) | (0<<ADC1D) | (0<<ADC0D);

    //전역 번수처리
    #asm("sei")
}

void activate()
{

    char answer[]="\r\nEnter mode : ";
    char answer2[]="\r\nLED blink mode (1~10) :\n";
    char answer3[]="\r\nMeasurement temp mode (1~5):\n";
    char wrong[]="\r\nwrong input.";
    //1번 조건, 시작시 led를 2번 깜빡임
    blink(2);

    while (1)
    {
        //인터럽트가 발생하고 복귀할 때에는 플래그의 값을 다시 0으로 초기화 해주어야 함
        interupt_flag=0;
        //만일의 경우 LED가 동작한 상태로 끝나게 되었을 때, LED가 계속 켜져 있는 불상사를 막기위해 존재
        PORTD.5=0;

        //answer 문자열은 "Enter mode : "을 저장하고 있음
        for(i=0; i<strlen(answer);i++)
            USART_send(answer[i]);

        scanf("%d",&mode);

        switch(mode)
        {
        case 1:
            //LED를 반짝이는 모드

            //answer2 문자열은 "LED blink mode (1~10):"을 저장하고 있음
            //wrong 문자열은 "wrong input."을 저장하고 있음
            for(i=0; i<strlen(answer2);i++)
                USART_send(answer2[i]);

            scanf("%d",&j);

            //조건의 1회이상 10회 이하의 입력만을 받지 위해 존재
            if(j<1||j>10)
            {
                for(i=0; i<strlen(wrong);i++)
                    USART_send(wrong[i]);
                break;
            }
            blink(j);
            break;
        case 2:
            //온도를 측정하고, 평균 온도를 출력하는 모드
            //answer3 문자열은 "Measurement temp mode (1~5):"을 저장하고 있음
            for(i=0; i<strlen(answer3);i++)
                USART_send(answer3[i]);

            scanf("%d",&j);

            //조건의 1회이상 5회 이하의 입력만을 받지 위해 존재
            if(j<1||j>5)
            {
                for(i=0; i<strlen(wrong);i++)
                    USART_send(wrong[i]);
                break;
            }

            //입력 값 j만큼만 반복하기 위한 반복문
            for(i=0; i<j; i++)
            {
                //온도 측정 공식이라고 함
                temp=((read_adc(8)*1.1/1024)-0.5)*100;
                //현재 온도를 출력
                printf("\r\nnow temp : %d",temp);
                //EEPROM에 기록, addre값을 계속 증가시킴
                write((unsigned char)temp, addre++);
                //측정한 기온의 평균을 구하기 위해 일단 전부 더함
                sum+=temp;
                //약간의 딜레이를 줌
                delay_ms(1000);
            }
            //평균 온도를 출력함
            printf("\r\naverage of temp : %d",sum/j);
            //재사용을 위해 sum을 0으로 초기화
            sum=0;
            break;
        case 3:
            //온도를 EEPROM에 기록한 온도를 불려오는 모드

            //모드 2번에서 기록하였다면, addre의 값에 증가가 있어야함
            if(addre==40)
                printf("\r\nNONE data");
            else
            {
                //시작 값이였던 40부터, 지금까지 기록한 기록 모두를 출력함
                for(i=40; i<addre; i++)
                {
                     data=read(i);
                     printf("\r\n%d",(int)data);
                }
            }
            //주소를 다시 시작 값으로 초기화함
            addre=40;
            break;
        case 4:
            //전압 측정 모드

            //전압 측정 공식이라고 함
            volt= (read_adc(0) * 5.0 *100 / 1024);
            //해당 버젼에서 float값을 출력하는 데 오류거 있어서, 야매로 소수점을 출력함
            printf("volt : %d.%d",volt / 100 , volt % 100);
            break;
        default:
            //만일 예상외의 입력을 처리하기 위한 default문
            for(i=0; i<strlen(wrong);i++)
                USART_send(wrong[i]);
            break;
        }
    }

}

void blink(int num)
{
    for(i=0; i<num; i++)
    {
        if(interupt_flag)
            break;
        PORTD.5=1;
        delay_ms(500);
        PORTD.5=0;
        delay_ms(500);
    }
}

int USART_send(char data)
{
    while(!(UCSR0A & (1<<UDRE0)));
    UDR0 = data;
    return data;
}

int USART_receive(void)
{
    while(!(UCSR0A & (1<<RXC0)));
    return UDR0;
}

unsigned int read_adc(unsigned char ch)
{
    if(ch=0)
        ADMUX = ADC_VREF_TYPE;
    else if(ch=8)
        ADMUX = ADC_VREF_TYPE_TEMP;
    ch&=0b00000111;
    ADMUX=(ADMUX&0xF8)|ch;
    ADCSRA|=(1<<ADSC);
    while (ADCSRA & (1<<ADSC));
    return ADCW;
}

interrupt [EXT_INT0] void ext_int0_isr(void)
{
    interupt_flag=1;
    delay_ms(1000);
    printf("\r\ninterupt activate");
}

void write(unsigned char data,unsigned int address)
{
      while(EECR & (1<<EEPE));
      EEAR=address;
      EEDR=data;
      EECR|=(1<<EEMPE);
      EECR|=(1<<EEPE);
}

unsigned char read(unsigned int address)
{
      while(EECR & (1<<EEPE));
      EEAR=address;
      EECR|=(1<<EERE);
      return EEDR;
}
```