import {
	ArchiveBook,
	Buildings2,
	Data,
	DocumentForward,
	DocumentText1,
	ElementEqual,
	Moneys,
	Note,
	Receipt21,
	ReceiptItem,
	TagUser,
	TickCircle,
	UserOctagon,
	CardTick,
	EmptyWalletTick,
} from 'iconsax-react';
import {TYPE_DATE, TYPE_SPECIAL} from './enum';

export const MAXIMUM_FILE = 10; //MB

export const allowFiles = [
	'application/pdf',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'image/jpeg',
	'image/jpg',
	'image/png',
];

export enum PATH {
	Any = 'any',

	Login = '/auth/login',
	ForgotPassword = '/auth/forgot-password',

	Profile = '/profile',
	ChangePassword = '/profile?_action=change-password',

	Home = '/',

	Project = '/',
	ProjectCreate = '/project/create',
	ProjectInfo = '/project/infor-project',
	ProjectContractor = '/project/infor-contractor',
	ProjectDisbursementProgress = '/project/disbursement-progress',
	ProjectWorkReport = '/project/work-report',
	ProjectPlanningCapital = '/project/planning-capital',
	UpdateInfoProject = '/project/update/infor-project',
	UpdateInfoCapital = '/project/update/info-capital',
	UpdateDisbursementProgress = '/project/update/update-disbursement-progress',
	UpdateInfoContractor = '/project/update/infor-contractor',
	ProjectContract = '/project/contract',

	Work = '/work',
	ContractWork = '/work/contract',
	AppendicesWork = '/work/appendices',

	ReportWork = '/report-work',
	ReportWorkCreate = '/report-work/create',
	ReportWorkUpdate = '/report-work/update',

	ReportDisbursement = '/report-disbursement',
	ReportDisbursementCreate = '/report-disbursement/create',
	ReportDisbursementCreateHistory = '/report-disbursement/create-history',
	ReportDisbursementUpdateHistory = '/report-disbursement/update-history',
	ReportDisbursementUpdate = '/report-disbursement/update',

	ContractReportDisbursement = '/report-disbursement/contract',

	ReportOverview = '/report-overview',
	ReportOverviewCreate = '/report-overview/create',

	ListContractor = '/list-contractor',

	Task = '/task',
	CreateTask = '/task/create',
	UpdateTask = '/task/update',

	Branch = '/branch',

	Contractor = '/contractor',

	GroupContractor = '/group-contractor',

	User = '/user',

	Account = '/account',

	Approve = '/approve',
	ContractorApproval = '/approve/contractor-approval',
	ApprovalContractor = '/approve/approval-contractor',

	PaymentApproval = '/payment-approval',

	CSCT = '/csct',
	CSCTCreate = '/csct/create',
	CSCTUpdate = '/csct/update',
}

export const Menu: {
	title: string;
	path: string;
	isSpecial?: TYPE_SPECIAL;
	pathActive?: string;
	icon: any;
}[] = [
	// {
	// 	title: 'Tổng quan',
	// 	path: PATH.Home,
	// 	pathActive: PATH.Home,
	// 	icon: ElementEqual,
	// },
	{
		title: 'Dự án của bạn ',
		path: PATH.Project,
		pathActive: '/project',
		icon: DocumentText1,
		isSpecial: TYPE_SPECIAL.NORMAL,
	},
	{
		title: 'Cập nhật tiến độ xử lý tháng trước',
		path: PATH.Work,
		pathActive: PATH.Work,
		icon: Note,
		isSpecial: TYPE_SPECIAL.NORMAL,
	},
	{
		title: 'Lập kế hoạch cho tháng sau',
		path: PATH.ReportWork,
		pathActive: PATH.ReportWork,
		icon: DocumentForward,
		isSpecial: TYPE_SPECIAL.NORMAL,
	},
	{
		title: 'Lập báo cáo giải ngân',
		path: PATH.ReportDisbursement,
		pathActive: PATH.ReportDisbursement,
		icon: Moneys,
		isSpecial: TYPE_SPECIAL.NORMAL,
	},

	{
		title: 'Báo cáo tổng hợp tự động',
		path: PATH.ReportOverview,
		pathActive: PATH.ReportOverview,
		icon: ArchiveBook,
		isSpecial: TYPE_SPECIAL.NORMAL,
	},
	{
		title: 'Danh sách nhà thầu',
		path: PATH.ListContractor,
		pathActive: PATH.ListContractor,
		icon: Receipt21,
		isSpecial: TYPE_SPECIAL.CONFIRM_CONTRACTOR,
	},
	{
		title: 'Quản lý quy trình',
		path: PATH.Task,
		pathActive: PATH.Task,
		icon: ReceiptItem,
		isSpecial: TYPE_SPECIAL.SENIOR,
	},
	{
		title: 'CSCT thanh toán',
		path: PATH.CSCT,
		pathActive: PATH.CSCT,
		icon: EmptyWalletTick,
		isSpecial: TYPE_SPECIAL.NORMAL,
	},
	{
		title: 'Quản lý chi nhánh',
		path: PATH.Branch,
		pathActive: PATH.Branch,
		icon: Data,
		isSpecial: TYPE_SPECIAL.SENIOR,
	},
	{
		title: 'Quản lý nhóm nhà thầu',
		path: PATH.GroupContractor,
		pathActive: PATH.GroupContractor,
		icon: Buildings2,
		isSpecial: TYPE_SPECIAL.SENIOR,
	},
	{
		title: 'Quản lý nhà thầu',
		path: PATH.Contractor,
		pathActive: PATH.Contractor,
		icon: Receipt21,
		isSpecial: TYPE_SPECIAL.SENIOR,
	},
	{
		title: 'Quản lý nhân viên',
		path: PATH.User,
		pathActive: PATH.User,
		icon: UserOctagon,
		isSpecial: TYPE_SPECIAL.SENIOR,
	},
	{
		title: 'Quản lý tài khoản',
		path: PATH.Account,
		pathActive: PATH.Account,
		icon: TagUser,
		isSpecial: TYPE_SPECIAL.SENIOR,
	},
	{
		title: 'Duyệt yêu cầu',
		path: PATH.ContractorApproval,
		pathActive: PATH.Approve,
		icon: TickCircle,
		isSpecial: TYPE_SPECIAL.SENIOR,
	},
];

export const KEY_STORE = 'task-monitor-user';

export const ListOptionTimePicker: {
	name: string;
	value: number;
}[] = [
	{
		name: 'Hôm nay',
		value: TYPE_DATE.TODAY,
	},
	{
		name: 'Tuần này',
		value: TYPE_DATE.THIS_WEEK,
	},
	{
		name: 'Tuần trước',
		value: TYPE_DATE.LAST_WEEK,
	},
	{
		name: 'Tháng này',
		value: TYPE_DATE.THIS_MONTH,
	},
	{
		name: 'Tháng trước',
		value: TYPE_DATE.LAST_MONTH,
	},
	{
		name: 'Năm này',
		value: TYPE_DATE.THIS_YEAR,
	},
	{
		name: 'Lựa chọn',
		value: TYPE_DATE.LUA_CHON,
	},
];
