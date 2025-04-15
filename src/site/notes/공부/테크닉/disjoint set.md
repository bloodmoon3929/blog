---
{"dg-publish":true,"permalink":"/공부/테크닉/disjoint set/"}
---

```cpp
#include <bits/stdc++.h>

using namespace std;
#define WBUF_SIZE (1 << 20)

char rbuf[WBUF_SIZE];
int ridx, nidx;

inline char read() 
{
    if (ridx == nidx) 
    {
        nidx = fread(rbuf, 1, 1 << 20, stdin);
        if (!nidx) return 0;
        ridx = 0;
    }
    return rbuf[ridx++];
}

inline int readInt() 
{
    int sum = 0;
    char now = read();
    bool flg = false;

    while (now <= 32) now = read();
    if (now == '-') flg = true, now = read();
    while (now >= 48) sum = sum * 10 + now - '0', now = read();

    return flg ? -sum : sum;
}

int arr[1000001][2]={1};

int find(int F);
void merge(int A, int B);

int main()
{
    int N,M,A,B,C;

    N = readInt();
    M = readInt();

    for(int i=0; i<N+1; i++)
        arr[i][0]=i;

    for(int i=0; i<M; i++)
    {
        A = readInt();
        B = readInt();
        C = readInt();

        if(A==1)
            if(find(B)==find(C))
                printf("YES\n");
            else
                printf("NO\n");
        else if(A==0)
            merge(B,C);
    }
}
  
int find(int F)
{
    if(arr[F][0]!=F)
        arr[F][0]=find(arr[F][0]);

    return arr[F][0];
}

void merge(int A, int B)
{
    if(find(A)!=find(B))
        if(arr[A][1]>arr[B][1])
        {
            arr[find(B)][1]+=arr[find(A)][1];
            arr[find(A)][0]=find(B);
        }
        else
        {
            arr[find(A)][1]+=arr[find(B)][1];
            arr[find(A)][0]=find(B);
        }
}
```

객체끼리의 연결성을 구하는 것인데, 해당 객체의 최상위 객체의 주소를 가져야함

만일 한 객체에 대해 같은 최상위 객체를 가진다면 연결된 것으로 본다


연결은 최상위 객체 번호를 바꾸는 것으로 한다.