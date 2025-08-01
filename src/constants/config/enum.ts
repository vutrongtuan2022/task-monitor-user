export enum QUERY_KEY {
	table_list_user,
	table_list_activity_project,
	table_list_contractor_project,
	table_list_project_fund,
	table_list_work,
	table_list_work_project,
	table_tree_work_project,
	table_list_work_report,
	table_list_work_project_report,
	table_list_modify_work_report,
	table_list_report_work,
	table_list_report_work_last_month,
	table_list_report_disbursement,
	table_overview_report,
	table_work_report_overview,
	table_next_plan_report_overview,
	table_contract_report_disbursement,
	table_contract_fund_detail,
	table_contract_fund_detail_contractor,
	table_contractors_detail,
	table_contract_fund_for_overview,
	table_contract_for_project,
	table_contract_by_activity,
	table_list_account,
	table_branches,
	table_CSCT,
	table_contractor,
	table_list_contractor,
	table_group_contractor,
	table_task_cat,
	table_contract_by_appendices,
	table_update_contractor_cat,
	table_project_for_contractor,
	table_contractor_cat_by_contractor,
	table_update_contractor_cat_by_contractor,
	table_requester_contractor,
	detail_contractor_for_admin,
	table_pn_contract,
	table_contract_fund_by_contractor,
	table_contractfund_detail_paged_contract_contract_fund,
	table_contract_fund_for_overview_contractor,

	dropdown_branches,
	dropdown_project,
	dropdown_contract,
	dropdown_task_cat,
	dropdown_user,
	dropdown_manager,
	dropdown_province,
	dropdown_district,
	dropdown_town,
	dropdown_contractor,
	dropdown_group_contractor,
	dropdown_task_report,
	dropdown_contractor_in_project,
	dropdown_role,
	dropdown_activity_in_project,
	dropdown_contract_by_activity,
	dropdown_project_by_month,

	detail_project,
	detail_budget_project,
	detail_general_update_project,
	detail_contractor_project,
	detail_group_contractor,
	detail_progress_project,
	detail_update_contractor_project,
	detail_progress_fund_project,
	detail_report_disbursement,
	detail_report_work,
	detail_report_overview,
	detail_project_report_overview,
	detail_disbursement_report_overview,
	detail_profile,
	detail_profile_update,
	detail_activity_in_report,
	detail_contract,
	detail_contract_addendum,
	detail_contract_report_fund,
	detail_contract_report_fund_history,
	detail_contract_report_fund_for_update,
	detail_contract_report_fund_history_for_update,
	detail_progress_contract_fund_project,
	detail_activity_contract,
	detail_account,
	detail_branches,
	detail_contractor,
	detail_task,
	detail_user,
	detail_contract_addium,
	detail_csct,
	detail_pn_for_export,
	detail_list_contract_csct,

	tree_task,
	count_unseen_noti,
	list_notify,
	get_code_pn,
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

export enum TYPE_WORK {
	TASK,
	SUB_TASK,
	SUB_SUB_TASK,
}

export enum STATE_WORK {
	NOT_PROCESSED,
	PROCESSING,
	COMPLETED,
	REJECTED,
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
	NOT_REPORT, // Chưa báo cáo
	REPORTED, // Đã báo cáo || Chưa duyệt
	APPROVED, // Đã duyệt
	REJECTED, // Đã từ chối
}

export enum STATE_REPORT {
	REJECTED, // Từ chối
	REPORTED, // Đã duyệt
	PLANNING, // Lên kế hoạch
	PENDING_APPROVAL, // Đã báo cáo
	IN_PROGRESS, // Đang thực hiện
}

export enum STATE_COMPLETE_REPORT {
	NOT_DONE,
	ON_SCHEDULE,
	SLOW_PROGRESS,
}

export enum SORT_TYPE {
	DECREASE = 1,
	INCREASE,
}

export enum STATE_NOTIFY {
	NOT_READ,
	READ,
}

export enum STATE_CONTRACT_WORK {
	EXPIRED, //HẾT HẠN
	PROCESSING, //ĐANG THỰC HIỆN
	END, //HỦY
}

export enum TYPE_NOTIFY {
	PROJECT = 1,
	REPORT,
	CONTRACT,
	OVERVIEW,
	CONTRACT_FUND,
	APPROVAL_CONTRACTOR,
}

export enum STATUS_ACCOUNT {
	NOT_HAVE = 0,
	HAVE = 1,
	LOCK = 2,
}

export enum TYPE_SPECIAL {
	NORMAL,
	SENIOR,
	CONFIRM_CONTRACTOR,
}

export enum TYPE_CONTRACT_FUND {
	HISTORY,
	PRESENT,
}
export enum TYPE_INHERIT {
	NO, //0
	YES, //1
}
export enum STATE_APPROVED {
	NOT_REPORTED, // 0: chưa duyệt
	APPROVED, //1: đã duyệt
	REJECTED, //2: đã từ chối
}

export enum STATUS_CSCT {
	NUMBER_ISSUED = 1, // Đã cấp số
	PENDING_APPROVAL, // Chờ phê duyệt
	APPROVED, // Đã phê duyệt
	REJECTED, // Bị từ chối
}

export enum TYPE_CONTRACT_PN {
	PAY = 1,
	ADVANCE,
}
