import {DocumentForward, DocumentText1, ElementEqual, Moneys, Note} from 'iconsax-react';
import {TYPE_DATE} from './enum';

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

	ChangePassword = '/change-password',
	Profile = '/profile',

	Home = '/',

	Project = '/project',
	ProjectCreate = '/project/create',
	ProjectInfo = '/project/infor-project',
	ProjectContractor = '/project/infor-contractor',
	ProjectDisbursementProgress = '/project/disbursement-progress',
	ProjectWorkReport = '/project/work-report',
	UpdateInfoProject = '/project/update/infor-project',
	UpdateInfoCapital = '/project/update/info-capital',
	UpdateInfoContractor = '/project/update/infor-contractor',

	Work = '/work',

	ReportWork = '/report-work',
	ReportWorkCreate = '/report-work/create',
	ReportWorkUpdate = '/report-work/update',

	ReportDisbursement = '/report-disbursement',
}

export const Menu: {
	title: string;
	path: string;
	pathActive?: string;
	icon: any;
}[] = [
	{
		title: 'Tổng quan',
		path: PATH.Home,
		pathActive: PATH.Home,
		icon: ElementEqual,
	},
	{
		title: 'Quản lý dự án',
		path: PATH.Project,
		pathActive: PATH.Project,
		icon: DocumentText1,
	},
	{
		title: 'Công việc cần làm',
		path: PATH.Work,
		pathActive: PATH.Work,
		icon: Note,
	},
	{
		title: 'Báo cáo công việc',
		path: PATH.ReportWork,
		pathActive: PATH.ReportWork,
		icon: DocumentForward,
	},
	{
		title: 'Báo cáo giải ngân',
		path: PATH.ReportDisbursement,
		pathActive: PATH.ReportDisbursement,
		icon: Moneys,
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
