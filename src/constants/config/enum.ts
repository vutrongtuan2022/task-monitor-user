export enum QUERY_KEY {
	table_list_user,
	table_list_activity_project,
	table_list_contractor_project,
	table_list_project_fund,
	table_list_work,
	table_list_work_project,
	table_list_work_report,
	table_list_report_work,
	table_list_report_work_last_month,
	table_list_report_disbursement,

	dropdown_branches,
	dropdown_project,
	dropdown_task_cat,
	dropdown_user,
	dropdown_manager,
	dropdown_province,
	dropdown_district,
	dropdown_town,
	dropdown_contractor,
	dropdown_group_contractor,

	detail_project,
	detail_budget_project,
	detail_general_update_project,
	detail_contractor_project,
	detail_group_contractor,
	detail_progress_project,
	detail_update_contractor_project,
	detail_progress_fund_project,
	detail_report_disbursement,
}

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

export enum STATUS_CONFIG {
	ACTIVE = 1,
	NOT_ACTIVE,
}

export enum STATE_PROJECT {
	PREPARE = 1,
	DO,
	FINISH,
}

export enum STATE_WORK_PROJECT {
	NOT_PROCESSED,
	PROCESSING,
	COMPLETED,
}

export enum STATUS_WORK_PROJECT {
	NOT_DONE,
	ON_SCHEDULE,
	SLOW_PROGRESS,
}

export enum TYPE_OF_WORK {
	ARISE,
	HAVE_PLAN,
}

export enum STATE_REPORT_DISBURSEMENT {
	NOT_APPROVED,
	APPROVED,
	REJECTED,
}

export enum STATE_REPORT_WORK {
	NOT_PROCESSED,
	PROCESSING,
	COMPLETED,
}

export enum STATE_REPORT {
	REJECTED,
	REPORTED,
	PLANNING,
	PENDING_APPROVAL,
	IN_PROGRESS,
}

export enum STATE_COMPLETE_REPORT {
	NOT_DONE,
	ON_SCHEDULE,
	SLOW_PROGRESS,
}
