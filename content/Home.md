---
cssclasses:
  - dashboard
  - my_style_width_100
dg-home: false
dg-publish: false
---

```widgets
type: clock
format: "12hr" | "24hr"
```
## 중요 일정
 - 
	 ```widgets
	 type: countdown
	 date: 2025-03-26 00:00:00
	 to: Gseed
	 ```
 - 

## 학습
- 코딩공부
	- [[백준풀이]]
- 옵시디언


## 현재 계획
- 예정
	- 
	- 
	- 
	- 
- 진행
	- 
- 완료
	-  

## 노트 리스트
- 최근 수정한 노트 
`$=dv.list(dv.pages('').sort(f=>f.file.mtime.ts,"desc").limit(5).file.link)`
- 최근 작성한 노트
`$=dv.list(dv.pages('').sort(f=>f.file.ctime.ts,"desc").limit(5).file.link)`
- 폴더
`$=dv.list(dv.pages('"algorithm"').sort(f=>f.file.ctime.ts,"desc").limit(5).file.link)`
- 태그
`$=dv.list(dv.pages('#자료구조/알고리즘').sort(f=>f.file.name,"desc").limit(5).file.link)`
- 완료
`$=dv.list(dv.pages('').where(p => p.completed === true).sort(f=>f.file.name, "asc").limit(5).file.link)`

## 챕터
- [[readME]]
- [[백준풀이]]
- [[Setting]]
- [[음악 리스트]]
- [[도서 목록]]
- [[여행지]]