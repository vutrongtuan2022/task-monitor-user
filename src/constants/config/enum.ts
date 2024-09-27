export enum QUERY_KEY {}

export enum TYPE_DATE {
	ALL = -1,
	TODAY = 1,
	YESTERDAY = 2,
	THIS_WEEK = 3,
	LAST_WEEK = 4,
	THIS_MONTH = 5,
	LAST_MONTH = 6,
	THIS_YEAR = 7,
	LAST_7_DAYS = 8,
	LUA_CHON = 9,
}

export enum TYPE_ACCOUNT {
	USER = 1,
	MANAGER,
	ADMIN,
}

export enum TYPE_GENDER {
	MALE,
	FEMALE,
	OTHER,
}
