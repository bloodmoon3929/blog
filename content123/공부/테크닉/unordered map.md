---
{"dg-publish":true,"permalink":"/공부/테크닉/unordered map/"}
---

```cpp
#include <bits/stdc++.h>
#define BUF_SIZE (1 << 20)

using namespace std;

unordered_map<string, pair<string, int>> mapp;

char Readbuffer[BUF_SIZE];

inline char read();
inline int readInt();
string readString();

string find(const string &F);
void merge(const string &A, const string &B);

int main()
{
    int N, M;
    string temp1, temp2;
    N = readInt();

    for (int i = 0; i < N; i++)
    {
        cin >> M;
        for (int j = 0; j < M; j++)
        {
            temp1= readString();
            temp2= readString();
  
            if (mapp.find(temp1) == mapp.end())
                mapp[temp1] = {temp1, 1};

            if (mapp.find(temp2) == mapp.end())
                mapp[temp2] = {temp2, 1};

            if (find(temp1) != find(temp2))
            {
                merge(temp1, temp2);
            }

            printf("%d\n",mapp[find(temp1)].second);
        }
        mapp.clear();
    }
    return 0;
}

string find(const string &F)
{
    if (mapp[F].first != F)
        mapp[F].first = find(mapp[F].first);
    return mapp[F].first;
}

void merge(const string &A, const string &B)
{
    string rootA = find(A);
    string rootB = find(B);

    if (rootA != rootB)
    {
        if (mapp[rootA].second > mapp[rootB].second)
        {
            mapp[rootB].first = rootA;
            mapp[rootA].second += mapp[rootB].second;
        }
        else
        {
            mapp[rootA].first = rootB;
            mapp[rootB].second += mapp[rootA].second;
        }
    }
}

inline char read() {
    static int curr_pos = 0, next_pos = 0;
    if (curr_pos == next_pos) {
        next_pos = fread(Readbuffer, 1, 1, stdin);
        if (next_pos == 0) return 0;
        curr_pos = 0;
    }
    return Readbuffer[curr_pos++];
}

inline int readInt() {
    int sum = 0;
    char curr = read();
    bool flag = false;
    
    while (curr <= 32)
        curr = read();

    if (curr == '-') {
        flag = true;
        curr = read();
    }

    while (curr >= '0' && curr <= '9') {
        sum = sum * 10 + curr - '0';
        curr = read();
    }

    return flag ? -sum : sum;
}

  

inline string readString() {
    string result;
    char now = read();

    while (now <= 32)
        now = read();

    while (now > 32) {
        result += now;
        now = read();
    }

    return result;
}
```
![첨부파일/bok-Pasted image 20240703211629.png](/bok-Pasted%20image%2020240703211629.png)

그냥 map을 사용했을시에 시간은 700ms인 반면 unordered_map의 경우 220ms가 걸린다

map은 기록할 때 순회하여 기록하나, unordered_map은 무작위 기록하기에 빠르다.