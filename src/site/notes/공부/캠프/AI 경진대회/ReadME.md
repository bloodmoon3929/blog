## 작품명
food-tournment

## 작품의 개요
사람이 살기 위해 꼭 해야 하지만, 하루 3번 선택하기 귀찮은 음식 추천 앱

이 앱은 단지 귀찮음이나, 재미만을 위한 것이 아닌 해외나 타 지역을 방문했을 때, 무엇을 먹을지 선택할 수 없을 때, 쓰기 좋은 앱

## 사업성
배달앱의 서브 기능으로써 가능

## 사용한 API
### 검색 API
#### 주소
https://developers.naver.com/apps/#/myapps/9YXsr627hUt8WssO5__O/overview


#### 코드
Client ID : 9YXsr627hUt8WssO5__O
Client Secret : oaYp5_rBZn

#### 사용한 이유
맛집 추천을 그저 네이버 맵에서 제공한 정보를 사용하여도 되지만 블로그 검색을 통해 해당 식당의 자세한 평가를 찾기 위해서

#### 사용법
환경 추가에 https://colab.research.google.com 추가

자세한 것은 다음을 참고
https://developers.naver.com/docs/serviceapi/search/blog/blog.md#%EB%B8%94%EB%A1%9C%EA%B7%B8-%EA%B2%80%EC%83%89-%EA%B2%B0%EA%B3%BC-%EC%A1%B0%ED%9A%8C


### 네이버 지도 API
#### 주소
https://console.ncloud.com/maps/application

#### 코드
Client ID(X-NCP-APIGW-API-KEY-ID) : iertxkn3a8
Client Secret(X-NCP-APIGW-API-KEY) : HzAs7AquNa8TQ7bcXZO7dcpo6hI4um3tbiwG5mtZ

#### 사용한 이유
과거 구글 맵으로 유사한 앱을 만들었으나 구글에서는 메뉴판을 올리지 않은 가게가 대다수고 카태고리 또한 비슷하였기에 이번에 대안으로 네이버 지도를 사용함

#### 사용법
환경 추가에 https://colab.research.google.com 추가

##### API URL
Static Map: https://maps.apigw.ntruss.com/map-static/v2
Directions 5: https://maps.apigw.ntruss.com/map-direction/v1
Directions 15: https://maps.apigw.ntruss.com/map-direction-15/v1
Geocoding: https://maps.apigw.ntruss.com/map-geocode/v2
Reverse Geocoding: https://maps.apigw.ntruss.com/map-reversegeocode/v2

이 중 Static Map, Geocoding, Reverse Geocoding을 사용하였음
Static Map은 정적인 지도를 제공하고, Geocoding은 위치의 좌표값을, Reverse Geocoding은 좌표의 위치를 알려줌

자세한 것은 다음을 참고
https://api.ncloud-docs.com/docs/ko/application-maps-overview


## UI
### 1번 탭
토너먼트
토너먼트 설정
가격 필터를 통한 가격 설정
음식의 카테고리 설정
위치를 현재 위치로 설정
내가 주소를 직접 입력
검색 반경 설정
토너먼트 규모
토너먼트 시작
진행률
내가 선택한 토너먼트에 대한 정보
파싱한 음식점의 사진
메뉴보기  
AI 요약 리뷰보기
![첨부파일/Pasted image 20250901225423.png](/src/site/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pasted%20image%2020250901225423.png)

![첨부파일/Pasted image 20250901225444.png](/src/site/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pasted%20image%2020250901225444.png)
### 2번 탭
나의 토너먼트 기록 (우승기록)
AI 취향분석
AI 비슷한 취향의 사용자들

![첨부파일/Pasted image 20250901225503.png](/src/site/img/user/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Pasted%20image%2020250901225503.png)


## 구현해야 하는 기능
가격 필터(네이버 지도)
카테고리 (네이버 지도)
현재 위치 감지 (네이버 지도)
위치의 좌표 값 변환 (Geocoding)
검색 반경 설정 (네이버 지도 기능)
토너먼트 규모(본인보다 이하인 선택지만 보이거나 선택할 수 있게)
음식점 사진 파싱 (네이버 검색기능)
메뉴 보기 (네이버 검색기능)
AI 리뷰 요약 (GPT 프롬프트 작성해야 함 Tools 구현)
토너먼트 우승기록(sql, DB 설계해야 함)
AI 비슷한 취향의 사용자의 기록 매칭 (sql, GPT 프롬프트 작성)-이 부분을 지역별 맛집선택 빈도로 이기능은 추가 구현 가능성으로




Db
지역 선택 버튼
그 지역 총 갯수와 맛집 갯수로 비율
맛집을 누를시 네이버 지도로 메뉴와 가격 사진 불러오기


지역 테이블

| 필드    | 속성     |         | 비고  |
| ----- | ------ | ------- | --- |
| 지역 Id | Int    | Primary |     |
| 지역이름  | Var 50 |         |     |
| 위도    | Double |         |     |
| 경도    | Double |         |     |
|       |        |         |     |
|       |        |         |     |
맛집 테이블

| 필드      | 필드      | 속성  |         | 비고     |
| ------- | ------- | --- | ------- | ------ |
| 레스터랑 Id | 레스터랑 Id | Int | Primary |        |
| 맛집 이름   | 맛집 이름   | Int |         |        |
| 주소      | 주소      | Var |         |        |
| 지역 id   | 지역 id   | Int | Foreign | 지역 테이블 |
|         |         |     |         |        |
|         |         |     |         |        |

유저 선택 테이블

|       |     |         |        |
| ----- | --- | ------- | ------ |
| 선택 id | Int | Primary |        |
| 식당 id | Int | Foreign | 맛집 테이블 |
| Count | Int |         |        |


SELECT
    R.region_name,
    SUM(US.selection_count) AS total_region_selections
FROM
    Regions AS R
JOIN
    Restaurants AS Rest ON R.region_id = Rest.region_id
JOIN
    UserSelections AS US ON Rest.restaurant_id = US.restaurant_id
GROUP BY
    R.region_name;


## 구현해야 하는 기능

검색 반경 설정
가격 필터를 통한 가격 설정
음식의 카테고리 설정(구현 X)
(네이버 지도 반경내 맛집 찾기 
음식점 카테고리로 찾을 수 있을 것
음식점의 정보에 메뉴가 있어서 그것을 활용할것
)

위치를 현재 위치로 설정
내가 주소를 직접 입력

토너먼트 규모

토너먼트 시작
진행률
내가 선택한 토너먼트에 대한 정보

파싱한 음식점의 사진
메뉴보기
(네이버지도 기능-사진, 메뉴, 영업시간, 전화번호 )

AI 요약 리뷰보기
(GPT API)

토너먼트 기록 (우승기)
지역선택
지역별 맛집 확인
(데이터베이스)



## 구현된 API 사용법
### geocoding
API.ncp_geocoding(ncp_query, ncp_headers)
반환 값 : json
"ncp_geocoding": { "success": true, "status_code": 200, "data": { "status": "OK", "meta": { "totalCount": 1, "page": 1, "count": 1 }, "addresses": [ { "roadAddress": "전북특별자치도 남원시 주천면 장안용궁길 3", "jibunAddress": "전북특별자치도 남원시 주천면 장안리 145-1", "englishAddress": "3, Janganyonggung-gil, Jucheon-myeon, Namwon-si, Jeonbuk-do, Republic of Korea", "addressElements": [ { "types": [ "SIDO" ], "longName": "전북특별자치도", "shortName": "전북특별자치도", "code": "" }, { "types": [ "SIGUGUN" ], "longName": "남원시", "shortName": "남원시", "code": "" }, { "types": [ "DONGMYUN" ], "longName": "주천면", "shortName": "주천면", "code": "" }, { "types": [ "RI" ], "longName": "장안리", "shortName": "장안리", "code": "" }, { "types": [ "ROAD_NAME" ], "longName": "장안용궁길", "shortName": "장안용궁길", "code": "" }, { "types": [ "BUILDING_NUMBER" ], "longName": "3", "shortName": "3", "code": "" }, { "types": [ "BUILDING_NAME" ], "longName": "", "shortName": "", "code": "" }, { "types": [ "LAND_NUMBER" ], "longName": "145-1", "shortName": "145-1", "code": "" }, { "types": [ "POSTAL_CODE" ], "longName": "55802", "shortName": "55802", "code": "" } ], "x": "127.4425610", "y": "35.3893580", "distance": 0.0 } ], "errorMessage": "" } },

### naver_local
API.naver_local(naver_local_query, naver_headers)
반환 값 : json
"naver_local": { "success": true, "status_code": 200, "data": { "lastBuildDate": "Tue, 02 Sep 2025 12:39:06 +0900", "total": 3, "start": 1, "display": 3, "items": [ { "title": "중화요리<b>본가</b>", "link": "", "category": "중식>중식당", "description": "", "telephone": "", "address": "전북특별자치도 남원시 주천면 장안리 145-1", "roadAddress": "전북특별자치도 남원시 주천면 장안용궁길 3", "mapx": "1274423168", "mapy": "353894647" }, { "title": "춘향명태<b>본가</b>", "link": "", "category": "한식>해물,생선요리", "description": "", "telephone": "", "address": "전북특별자치도 남원시 천거동 156", "roadAddress": "전북특별자치도 남원시 요천로 1415", "mapx": "1273772275", "mapy": "354012309" }, { "title": "갈비<b>본가</b>", "link": "", "category": "한식>육류,고기요리", "description": "", "telephone": "", "address": "전북특별자치도 남원시 금동 407-1", "roadAddress": "전북특별자치도 남원시 금하정1길 27-3", "mapx": "1273737110", "mapy": "354043319" } ] } },

### naver_blog
API.naver_blog(naver_blog_query, naver_headers)
반환 값 : json
"naver_blog": { "success": true, "status_code": 200, "data": { "lastBuildDate": "Tue, 02 Sep 2025 12:39:07 +0900", "total": 32170, "start": 1, "display": 2, "items": [ { "title": "<b>강남역맛집</b> cgv근처 다미곱창 리얼<b>리뷰</b> 데이트<b>맛집</b> 꼭 참고바람", "link": "[https://blog.naver.com/sandyday/223938135034](https://blog.naver.com/sandyday/223938135034)", "description": "데이트<b>맛집</b> 새로 <b>강남역</b> 거리에 신규 오픈한 <b>강남역맛집</b> 다미곱창입니다 특히나 <b>강남</b>에서 좀 괜찮은 데이트<b>맛집</b> 찾는다하는 커플 남자친구 집중! 이 <b>맛집</b>은 꼭 가보시길 여자로서 입장에서200번 추천드립니다... ", "bloggername": "직장인 결혼준비 재테크 리뷰어 샌디데이", "bloggerlink": "blog.naver.com/sandyday", "postdate": "20250718" }, { "title": "<b>강남역 맛집</b> '꾸아 <b>강남역</b>CGV점' 쌀국수 분짜 내돈내산 <b>리뷰</b>", "link": "[https://blog.naver.com/bbabi-/223664185290](https://blog.naver.com/bbabi-/223664185290)", "description": "<b>강남역</b>에서 놀다가 즉흥으로 쌀국수 <b>맛집</b> 다녀온 빠비에요 꾸아 내돈내산 <b>리뷰</b>입니다~ 꾸아 <b>강남역</b>CGV... 맛있게 먹는 법도 와르르 쓰여있고ᄏᄏᄏ 뭔가 친절 대마왕 스타일 <b>강남역 맛집</b> 꾸아 메뉴판 보실... ", "bloggername": "힐링에 목숨 거는 사람", "bloggerlink": "blog.naver.com/bbabi-", "postdate": "20241121" } ] } },

### google photo
API.google_photo(place_query, GOOGLE_API_KEY)
반환 값 : 사진의 주소
https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=ATKogpfaTnleV5WAoF_2YBBEll27VGsPmh2XwKEJP5G3snpeQqbRh2mlA_-fudHdGDGFBgAOjnZWKa-LJDMmlV9DFq7_CuUPgkx8PFlorSr4E5bSCRKKg_20iAP_GsEbPRQ2GYdcmEHubzhqZa2V6BY5NzUzm5z0T2IlawB0FNe3B1hoIuuSKj7N6FSgtTtuusRq2n6mM9cAXPiFWnLsyH4qLL871QrpfHx6PPn0p-ZNhAR58meiUshekNkaeAJENzkRgNBmeGzsVrQ3PP3lF49pL5ahDN2QCii_7HJCTjgsFelyqlMkQaoXeDHk0IoraSoTJFi8x6R29X-VqYIPL1EhwlLS6IjHNqkMlpNWJRYXiHPCDVRFQa6us00AfJojLCcAvdM7QRklg9Vgirx_C4zTFdC2pA1-H_nMfqHGrlAZdoms_DUX9zg6CdTq72c83Q&key=AIzaSyDoe4Alb8FyPPAmJpo-I02igGRI_yyBlaI



제출 메일 : young.admin@gmail.com
010-3603-1559
김영준