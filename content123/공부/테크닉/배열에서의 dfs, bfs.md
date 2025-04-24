---
{"dg-publish":true,"permalink":"/공부/테크닉/배열에서의 dfs, bfs/"}
---

배열에서 길찾기를 하는 문제가 있을것이다. 이 때 사용할 수 있는 테크닉이다.
```cpp
const int dx[4] = {-1, 1, 0, 0};
const int dy[4] = {0, 0, -1, 1};

void dfs(int x, int y, char color) 
{
    visited[x][y] = true;
    for (int i = 0; i < 4; ++i) 
    {
        int nx = x + dx[i];
        int ny = y + dy[i];
        if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[nx][ny] && grid[nx][ny] == color) 
            dfs(nx, ny, color);
    }
}
```

```cpp
const int dx[4] = {-1, 1, 0, 0};
const int dy[4] = {0, 0, -1, 1};
```
다음은 x, y의 이동 경로이다. 인덱스를 통해서 상하좌우 이동을 제어할 수 있게 되고, if문을 사용하기 않고도 이동할 수 있다

```cpp
if (nx >= 0 && nx < N && ny >= 0 && ny < N)
```
다음은 배열범위를 초과하지 않도록 제어하는 부분이다.