가장 쉬운 c++ fastio는

```cpp
//C와 C++과의 연동성을 제거하는 함수임
ios_base::sync_with_stdio(false);
//cin과 cout가 서로 붙어 있을때, cin이 입력을 끝낼 때까지 cout 출력이 되지 않지만 해당 함수를 사용함으로 cin이 입력 받는 중에도 출력이 됨됨
cin.tie(NULL);
```




```cpp
#include<cstdio>
#include<string>

using namespace std;

//버퍼의 크기를 2의 20승으로 지정, 20승인 이유는 그냥 크게 잡은 것
#define BUF_SIZE (1 << 20)

//버퍼
char Readbuffer[BUF_SIZE];


//입력 함수
inline char read();
inline int readInt();
string readString();

int main(void)
{
    int N;
    string S;
    N=readInt();
    S=readString();

    //.c_str()은 char* 로 변환해주는 함수이며, 반환 값은 문자열의 시작 주소임, 즉 char[]처럼 사용가능함
    printf("%d\n%s",N*2,S.c_str());
}

inline char read()
{
    static int curr_pos, next_pos;
    if (curr_pos == next_pos)
    {
        next_pos = fread(Readbuffer, 1, 1 << 20, stdin);
        if (!next_pos)
            return 0;
            
        curr_pos = 0;
    }
    return Readbuffer[curr_pos++];
}

inline int readInt() {
    int sum = 0;
    char curr = read();
    bool flag = false;

    //계행 및 공백문자 태우기
    while (curr <= 32)
        curr = read();
        
    //음수를 입력 받을시 flag값을 사용하여 음수 기록
    if (curr == '-')
    {
        flag = true;
        curr = read();
    }

    //계행 및 공백 문자 나올 때 까지 입력
    while (curr >= 48)
    {
        sum = sum * 10 + curr - '0';
        curr = read();
    }
    //flag 값에 따라 음수, 양수로 반환
    return flag ? -sum : sum;
}

inline string readString() {
    string result;
    char now = read();

    //계행, 공백 문자 태우기
    while (now <= 32)
        now = read();

   //계행 및 공백 문자 나올 때 까지 입력
    while (now > 32)
    {
        result += now;
        now = read();
    }

    return result;
}
```

