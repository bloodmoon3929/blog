
```cpp
#include<iostream>
#include<queue>

#define MOD 1000000007

using namespace std;

int main()
{
    long long int N,M,temp=1;
    cin>>N>>M;
    queue<int> binary;
    while(M>0)
    {
        binary.push(M%2);
        M/=2;
    }
    while(!binary.empty())
    {
        int bit =binary.front();
        binary.pop();
        if(bit==1)
        {
            temp*=(N%MOD);
        }
        N*=N;
    }
    cout<<temp%MOD;
    return 0;
}
```
승수의 경우 $A^{13}$을 구하는 방식을 $A^8 \times A^4 \times A^1$로 푸는 것이 메모리도 덜 차지하기에 승수를 2진수화 한 뒤 그 값에 따라 곱하여 주었습니다. 

[[모듈러 역수]]