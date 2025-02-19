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
	UserOctagon,
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
	UpdateInfoContractor = '/project/update/infor-contractor',

	Work = '/work',
	ContractWork = '/work/contract',
	AppendicesWork = '/work/appendices',

	ReportWork = '/report-work',
	ReportWorkCreate = '/report-work/create',
	ReportWorkUpdate = '/report-work/update',

	ReportDisbursement = '/report-disbursement',
	ReportDisbursementCreate = '/report-disbursement/create',
	ReportDisbursementCreateHistory = '/report-disbursement/create-history',
	ReportDisbursementUpdate = '/report-disbursement/update',

	ContractReportDisbursement = '/report-disbursement/contract',

	ReportOverview = '/report-overview',
	ReportOverviewCreate = '/report-overview/create',

	Task = '/task',
	CreateTask = '/task/create',
	UpdateTask = '/task/update',

	Branch = '/branch',

	Contractor = '/contractor',

	GroupContractor = '/group-contractor',

	User = '/user',

	Account = '/account',
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
		title: 'Quản lý dự án',
		path: PATH.Project,
		pathActive: '/project',
		icon: DocumentText1,
		isSpecial: TYPE_SPECIAL.NORMAL,
	},
	{
		title: 'Báo cáo công việc',
		path: PATH.ReportWork,
		pathActive: PATH.ReportWork,
		icon: DocumentForward,
		isSpecial: TYPE_SPECIAL.NORMAL,
	},
	{
		title: 'Báo cáo giải ngân',
		path: PATH.ReportDisbursement,
		pathActive: PATH.ReportDisbursement,
		icon: Moneys,
		isSpecial: TYPE_SPECIAL.NORMAL,
	},
	{
		title: 'Công việc cần làm',
		path: PATH.Work,
		pathActive: PATH.Work,
		icon: Note,
		isSpecial: TYPE_SPECIAL.NORMAL,
	},
	{
		title: 'Báo cáo tổng hợp',
		path: PATH.ReportOverview,
		pathActive: PATH.ReportOverview,
		icon: ArchiveBook,
		isSpecial: TYPE_SPECIAL.NORMAL,
	},
	{
		title: 'Quản lý quy trình',
		path: PATH.Task,
		pathActive: PATH.Task,
		icon: ReceiptItem,
		isSpecial: TYPE_SPECIAL.SENIOR,
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
