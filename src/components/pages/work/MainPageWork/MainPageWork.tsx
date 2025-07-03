import React, {useState} from 'react';

import {IWork, PropsMainPageWork} from './interfaces';
import styles from './MainPageWork.module.scss';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import {QUERY_KEY, STATE_COMPLETE_REPORT, STATE_WORK, STATUS_CONFIG, TYPE_OF_WORK, TYPE_WORK} from '~/constants/config/enum';
import {useRouter} from 'next/router';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import activityServices from '~/services/activityServices';
import Pagination from '~/components/common/Pagination';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Progress from '~/components/common/Progress';
import StateActive from '~/components/common/StateActive';
import {generateYearsArray} from '~/common/funcs/selectDate';
import IconCustom from '~/components/common/IconCustom';
import {AddSquare, DiscountShape, Edit, Eye, FolderOpen, PenAdd, ReceiptEdit, TickCircle} from 'iconsax-react';
import Tippy from '@tippyjs/react';
import Dialog from '~/components/common/Dialog';
import icons from '~/constants/images/icons';
import Loading from '~/components/common/Loading';
import Popup from '~/components/common/Popup';
import Form, {Input} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import Button from '~/components/common/Button';
import {toastWarn} from '~/common/funcs/toast';
import projectServices from '~/services/projectServices';
import PositionContainer from '~/components/common/PositionContainer';
import {PATH} from '~/constants/config';
import FormCreateContract from '~/components/utils/FormCreateContract';
import FormUpdateContract from '~/components/utils/FormUpdateContract';
import Image from 'next/image';
import FormReportsMonthly from '../FormReportsMonthly';
import TableListActivityProjectReport from '../TableListActivityProjectReport';

function MainPageWork({}: PropsMainPageWork) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const {
		_page,
		_pageSize,
		_keyword,
		_state,
		_year,
		_month,
		_type,
		_project,
		_activityUuid,
		_contractUuid,
		_projectReport,
		_yearReport,
		_monthReport,
	} = router.query;

	const [form, setForm] = useState<{issue: string; progress: number | null; reason: string}>({
		issue: '',
		progress: null,
		reason: '',
	});

	const [uuidConfirm, setUuidConfirm] = useState<string>('');
	const [uuidFinish, setUuidFinish] = useState<string>('');
	const [uuidIssue, setUuidIssue] = useState<string>('');
	const [uuidProgress, setUuidProgress] = useState<string>('');
	const [uuidReason, setUuidReason] = useState<string>('');
	const [uuidReport, setUuidReport] = useState<string>('');
	const [nameActivity, setNameActivity] = useState<string>('');
	const [isExportPopupOpen, setExportPopupOpen] = useState(false);

	const {data: listProject} = useQuery([QUERY_KEY.dropdown_project], {
		queryFn: () =>
			httpRequest({
				http: projectServices.categoryProject({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					excludeState: null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listWork = useQuery([QUERY_KEY.table_list_work, _page, _pageSize, _keyword, _state, _year, _month, _type, _project], {
		queryFn: () =>
			httpRequest({
				http: activityServices.listActivityForActionNew({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 10,
					keyword: (_keyword as string) || '',
					status: STATUS_CONFIG.ACTIVE,
					state: !!_state ? Number(_state) : null,
					year: !!_year ? Number(_year) : null,
					month: !!_month ? Number(_month) : null,
					type: !!_type ? Number(_type) : null,
					projectUuid: (_project as string) || '',
					userUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcConfirmActiviti = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xác nhận xử lý công việc thành công!',
				http: activityServices.reportActivity({
					activityUuid: uuidConfirm,
					reportUuid: uuidReport,
					type: 1, // 0: Cập nhật thông tin, 1: Xác nhận xử lý, 2: Xác nhận hoàn thành
					progress: -1,
					issue: '',
					stateNote: 0,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidConfirm('');
				queryClient.invalidateQueries([QUERY_KEY.table_list_work]);
			}
		},
	});

	const funcFinishActiviti = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xác nhận hoàn thành công việc thành công!',
				http: activityServices.reportActivity({
					activityUuid: uuidFinish,
					reportUuid: uuidReport,
					type: 2, // 0: Cập nhật thông tin, 1: Xác nhận xử lý, 2: Xác nhận hoàn thành
					progress: -1,
					issue: '',
					stateNote: 0,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidFinish('');
				queryClient.invalidateQueries([QUERY_KEY.table_list_work]);
			}
		},
	});

	const funcIssueActiviti = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xác nhận khó khăn công việc thành công!',
				http: activityServices.reportActivity({
					activityUuid: uuidIssue,
					reportUuid: uuidReport,
					type: 4, // 0: Cập nhật thông tin, 1: Xác nhận xử lý, 2: Xác nhận hoàn thành,4: cập nhật khó khăn vướng mắc
					progress: -1,
					issue: form.issue,
					stateNote: 0,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidIssue('');
				queryClient.invalidateQueries([QUERY_KEY.table_list_work]);
			}
		},
	});

	const funcProgressActiviti = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xác nhận tiến độ công việc thành công!',
				http: activityServices.reportActivity({
					activityUuid: uuidProgress,
					reportUuid: uuidReport,
					type: 0, // 0: Cập nhật thông tin, 1: Xác nhận xử lý, 2: Xác nhận hoàn thành
					progress: form?.progress,
					issue: '',
					stateNote: 0,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidProgress('');
				queryClient.invalidateQueries([QUERY_KEY.table_list_work]);
			}
		},
	});

	const funcReasonActiviti = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xác nhận tình trạng công việc thành công!',
				http: activityServices.updateActivitiesUnfinish({
					uuid: uuidReason,
					reason: form?.reason,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidReason('');
				queryClient.invalidateQueries([QUERY_KEY.table_list_work]);
			}
		},
	});

	return (
		<div className={styles.container}>
			<Loading
				loading={
					funcConfirmActiviti.isLoading ||
					funcFinishActiviti.isLoading ||
					funcIssueActiviti.isLoading ||
					funcProgressActiviti.isLoading ||
					funcReasonActiviti.isLoading
				}
			/>
			<div className={styles.head}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo tên công việc' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Dự án'
							query='_project'
							listFilter={listProject?.map((v: any) => ({
								id: v?.uuid,
								name: v?.name,
							}))}
						/>
					</div>

					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Năm'
							query='_year'
							listFilter={years?.map((v) => ({
								id: v,
								name: `Năm ${v}`,
							}))}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Tháng'
							query='_month'
							listFilter={months?.map((v) => ({
								id: v,
								name: `Tháng ${v}`,
							}))}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Loại công việc'
							query='_type'
							listFilter={[
								{
									id: TYPE_OF_WORK.ARISE,
									name: 'Phát sinh',
								},
								{
									id: TYPE_OF_WORK.HAVE_PLAN,
									name: 'Có kế hoạch',
								},
							]}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_state'
							listFilter={[
								{
									id: STATE_WORK.NOT_PROCESSED,
									name: 'Chưa xử lý',
								},
								{
									id: STATE_WORK.PROCESSING,
									name: 'Đang xử lý',
								},
								{
									id: STATE_WORK.COMPLETED,
									name: 'Đã hoàn thành',
								},
								{
									id: STATE_WORK.REJECTED,
									name: 'Bị từ chối',
								},
							]}
						/>
					</div>
					<div className={styles.btn}>
						<Button rounded_8 w_fit p_8_16 green bold onClick={() => setExportPopupOpen(true)}>
							<Image src={icons.exportExcel} alt='icon down' width={20} height={20} />
							Gửi báo cáo tháng
						</Button>
					</div>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listWork?.data?.items || []}
					loading={listWork.isLoading}
					noti={<Noti title='Dữ liệu trống!' des='Danh sách công việc cần làm trống!' />}
				>
					<Table
						fixedHeader={true}
						data={listWork?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: IWork, index: number) => (
									<p
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										{index + 1}
									</p>
								),
							},
							{
								title: 'Tháng báo cáo',
								fixedLeft: true,
								render: (data: IWork) => (
									<p
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										Tháng <span>{data?.report?.month}</span> - <span>{data?.report?.year}</span>
									</p>
								),
							},
							{
								title: 'Tên công trình',
								render: (data: IWork) => (
									<Tippy content={data?.report?.project?.name}>
										<p
											className={styles.name}
											style={{
												color:
													data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
											}}
										>
											{data?.report?.project?.name}
										</p>
									</Tippy>
								),
							},
							{
								title: 'Megatype',
								render: (data: IWork) => (
									<p>
										<span style={{color: '#2970FF'}}>{data?.type == TYPE_WORK.TASK && 'Task'}</span>
										<span style={{color: ''}}>{data?.type == TYPE_WORK.SUB_TASK && 'Subtask'}</span>
										<span>{data?.type == TYPE_WORK.SUB_SUB_TASK && 'Subsubtask'}</span>
									</p>
								),
							},
							{
								title: 'Lãnh đạo phụ trách',
								render: (data: IWork) => (
									<p
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										{data?.report?.project?.leader?.fullname}
									</p>
								),
							},
							{
								title: 'Tên công việc',
								render: (data: IWork) => (
									<Tippy content={data?.activity?.name}>
										<p
											className={styles.name}
											style={{
												color:
													data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
											}}
										>
											{data?.activity?.name}
										</p>
									</Tippy>
								),
							},
							{
								title: 'Giai đoạn thực hiện',
								render: (data: IWork) => (
									<p
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										{data?.stage == -1 || (!data?.stage && '---')}
										{data?.stage == 1 && 'Giai đoạn chuẩn bị đầu tư'}
										{data?.stage == 2 && 'Giai đoạn thực hiện đầu tư'}
										{data?.stage == 3 && 'Giai đoạn kết thúc đầu tư'}
									</p>
								),
							},

							{
								title: 'Loại công việc',
								render: (data: IWork) => (
									<p
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										{!data?.isInWorkflow && 'Phát sinh'}
										{data?.isInWorkflow && 'Có kế hoạch'}
									</p>
								),
							},
							{
								title: 'Khó khăn vướng mắc',
								render: (data: IWork) => (
									<Tippy content={data?.issue || '---'}>
										<p
											className={styles.issue}
											style={{
												color:
													data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
											}}
										>
											{data?.issue || '---'}
										</p>
									</Tippy>
								),
							},
							{
								title: 'Hợp đồng',
								render: (data: IWork) => (
									<p
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										{' '}
										{data?.activity?.contracts?.code || '---'}
									</p>
								),
							},
							{
								title: 'Tiến độ công việc',
								render: (data: IWork) => <Progress percent={data?.progress} width={80} />,
							},
							{
								title: 'Tình trạng xử lý',
								render: (data: IWork) => (
									<p
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										{data?.unfinishReason == null ? '---' : data?.unfinishReason}
									</p>
								),
							},
							{
								title: 'Trạng thái',
								render: (data: IWork) => (
									<div
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										<StateActive
											stateActive={data?.activityState}
											listState={[
												{
													state: STATE_WORK.NOT_PROCESSED,
													text: 'Chưa xử lý',
													textColor: '#FFFFFF',
													backgroundColor: '#FDAD73',
												},
												{
													state: STATE_WORK.PROCESSING,
													text: 'Đang xử lý',
													textColor: '#FFFFFF',
													backgroundColor: '#5B70B3',
												},
												{
													state: STATE_WORK.COMPLETED,
													text: 'Đã hoàn thành',
													textColor: '#FFFFFF',
													backgroundColor: '#16C1F3',
												},
												{
													state: STATE_WORK.REJECTED,
													text: 'Bị từ chối',
													textColor: '#FFFFFF',
													backgroundColor: '#EE464C',
												},
											]}
										/>
									</div>
								),
							},
							{
								title: 'Tình trạng',
								render: (data: IWork) => (
									<div
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										<StateActive
											isBox={false}
											stateActive={data?.deadlineState}
											listState={[
												{
													state: STATE_COMPLETE_REPORT.NOT_DONE,
													text: 'Chưa thực hiện',
													textColor: '#FF852C',
													backgroundColor: '#FF852C',
												},
												{
													state: STATE_COMPLETE_REPORT.ON_SCHEDULE,
													text: 'Đúng tiến độ',
													textColor: '#005994',
													backgroundColor: '#005994',
												},
												{
													state: STATE_COMPLETE_REPORT.SLOW_PROGRESS,
													text: 'Chậm tiến độ',
													textColor: '#EE464C',
													backgroundColor: '#EE464C',
												},
											]}
										/>
									</div>
								),
							},
							// {
							// 	title: 'Số hóa',
							// 	render: (data: IWork) => (
							// 		<p
							// 			style={{
							// 				color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
							// 			}}
							// 		>
							// 			{data?.digitalizedState == 0 && 'Chưa số hóa'}
							// 			{data?.digitalizedState == 1 && 'Đã số hóa'}
							// 		</p>
							// 	),
							// },
							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: IWork) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										{data?.type == TYPE_WORK.TASK && (
											<>
												{!data?.activity?.contracts?.uuid && (
													<IconCustom
														color='#06D7A0'
														icon={<AddSquare fontSize={20} />}
														tooltip='Thêm hợp đồng'
														onClick={() => {
															setNameActivity(data?.activity?.name);
															router.replace({
																pathname: router.pathname,
																query: {
																	...router.query,
																	_activityUuid: data?.activity?.uuid,
																},
															});
														}}
													/>
												)}
												{!!data?.activity?.contracts?.uuid && (
													<IconCustom
														color='#2970FF'
														icon={<Edit fontSize={20} />}
														tooltip='Chỉnh sửa hợp đồng'
														onClick={() => {
															router.replace({
																pathname: router.pathname,
																query: {
																	...router.query,
																	_contractUuid: data?.activity?.contracts?.uuid,
																},
															});
														}}
													/>
												)}
											</>
										)}

										{!data?.isInWorkflow && !data?.activity?.contracts?.code && (
											<IconCustom
												color='#06D7A0'
												icon={<AddSquare fontSize={20} />}
												tooltip='Thêm hợp đồng'
												onClick={() => {
													setNameActivity(data?.activity?.name);
													router.replace({
														pathname: router.pathname,
														query: {
															...router.query,
															_activityUuid: data?.activity?.uuid,
														},
													});
												}}
											/>
										)}

										{!data?.isInWorkflow && data?.activity?.contracts?.code && (
											<IconCustom
												color='#2970FF'
												icon={<Edit fontSize={20} />}
												tooltip='Chỉnh sửa hợp đồng'
												onClick={() => {
													router.replace({
														pathname: router.pathname,
														query: {
															...router.query,
															_contractUuid: data?.activity?.contracts?.uuid,
														},
													});
												}}
											/>
										)}

										{data?.activityState == STATE_WORK.NOT_PROCESSED && (
											<IconCustom
												color='#4BC9F0'
												icon={<TickCircle fontSize={20} />}
												tooltip='Xác nhận xử lý'
												onClick={() => {
													setUuidConfirm(data?.activity?.uuid);
													setUuidReport(data?.report?.uuid);
												}}
											/>
										)}

										{data?.activityState == STATE_WORK.PROCESSING && (
											<>
												<IconCustom
													color='#06D7A0'
													icon={<TickCircle fontSize={20} />}
													tooltip='Xác nhận hoàn thành'
													onClick={() => {
														setUuidFinish(data?.activity?.uuid);
														setUuidReport(data?.report?.uuid);
													}}
												/>
											</>
										)}
										{(data?.activityState == STATE_WORK.PROCESSING || data?.activityState == STATE_WORK.REJECTED) && (
											<>
												<IconCustom
													color='#5B70B3'
													icon={<DiscountShape fontSize={20} />}
													tooltip='Nhập tiến độ'
													onClick={() => {
														setUuidProgress(data?.activity?.uuid);
														setUuidReport(data?.report?.uuid);
														setForm({
															issue: data?.issue || '',
															progress: data?.progress || null,
															reason: data?.unfinishReason || '',
														});
													}}
												/>
											</>
										)}

										{(data?.activityState == STATE_WORK.COMPLETED ||
											data?.activityState == STATE_WORK.PROCESSING ||
											data?.activityState == STATE_WORK.REJECTED) && (
											<IconCustom
												color='#2970FF'
												icon={<PenAdd fontSize={20} />}
												tooltip='Nhập khó khăn vướng mắc'
												onClick={() => {
													setUuidIssue(data?.activity?.uuid);
													setUuidReport(data?.report?.uuid);
													setForm({
														issue: data?.issue || '',
														progress: data?.progress || null,
														reason: data?.unfinishReason || '',
													});
												}}
											/>
										)}

										<IconCustom
											color='#536884'
											icon={<ReceiptEdit fontSize={20} />}
											tooltip='Nhập tình trạng xử lý'
											onClick={() => {
												setUuidReason(data?.uuid);
												setForm((prev) => ({...prev, reason: data?.unfinishReason || ''}));
											}}
										/>

										{data?.type == TYPE_WORK.TASK && (
											<IconCustom
												color='#005994'
												icon={<Eye fontSize={20} fontWeight={600} />}
												tooltip='Xem chi tiết'
												href={`${PATH.Work}/${data?.activity?.uuid}`}
											/>
										)}
										{!data?.isInWorkflow && 'Phát sinh' ? (
											<IconCustom
												color='#005994'
												icon={<Eye fontSize={20} fontWeight={600} />}
												tooltip='Xem chi tiết'
												href={`${PATH.Work}/${data?.activity?.uuid}`}
											/>
										) : null}
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 10}
					total={listWork?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _state, _year, _month, _type, _project]}
				/>
			</WrapperScrollbar>

			<Dialog
				type='primary'
				open={!!uuidConfirm}
				icon={icons.question_1}
				onClose={() => setUuidConfirm('')}
				title={'Xác nhận xử lý'}
				note={'Bạn có chắc chắn muốn xác nhận xử lý công việc này không?'}
				onSubmit={funcConfirmActiviti.mutate}
			/>
			<Dialog
				type='primary'
				open={!!uuidFinish}
				icon={icons.question_1}
				onClose={() => setUuidFinish('')}
				title={'Xác nhận hoàn thành'}
				note={'Bạn có chắc chắn muốn xác nhận hoàn thành công việc này không?'}
				onSubmit={funcFinishActiviti.mutate}
			/>

			<Popup open={isExportPopupOpen} onClose={() => setExportPopupOpen(false)}>
				<FormReportsMonthly onClose={() => setExportPopupOpen(false)} />
			</Popup>

			<Form form={form} setForm={setForm}>
				<Popup open={!!uuidIssue} onClose={() => setUuidIssue('')}>
					<div className={styles.main_popup}>
						<div className={styles.head_popup}>
							<h4>Nhập khó khăn vướng mắc</h4>
						</div>
						<div className={styles.form}>
							<TextArea name='issue' placeholder='Nhập khó khăn' label='Mô tả khó khăn vướng mắc' />
							<div className={styles.group_button}>
								<div>
									<Button p_12_20 grey rounded_6 onClick={() => setUuidIssue('')}>
										Hủy bỏ
									</Button>
								</div>
								<div className={styles.btn}>
									<Button
										disable={!form.issue}
										p_12_20
										primary
										rounded_6
										icon={<FolderOpen size={18} color='#fff' />}
										onClick={funcIssueActiviti.mutate}
									>
										Lưu lại
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Popup>

				<Popup open={!!uuidReason} onClose={() => setUuidReason('')}>
					<div className={styles.main_popup}>
						<div className={styles.head_popup}>
							<h4>Nhập tình trạng xử lý</h4>
						</div>
						<div className={styles.form}>
							<TextArea
								name='reason'
								placeholder='Nhập tình trạng'
								label={
									<span>
										Mô tả tình trạng xử lý <span style={{color: 'red'}}>*</span>
									</span>
								}
							/>
							<div className={styles.group_button}>
								<div>
									<Button p_12_20 grey rounded_6 onClick={() => setUuidReason('')}>
										Hủy bỏ
									</Button>
								</div>
								<div className={styles.btn}>
									<Button
										disable={!form.reason}
										p_12_20
										primary
										rounded_6
										icon={<FolderOpen size={18} color='#fff' />}
										onClick={funcReasonActiviti.mutate}
									>
										Lưu lại
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Popup>

				<Popup open={!!uuidProgress} onClose={() => setUuidProgress('')}>
					<div className={styles.main_popup}>
						<div className={styles.head_popup}>
							<h4>Tiến độ công việc</h4>
						</div>
						<div className={styles.form}>
							<Input placeholder='Nhập % tiến độ công việc' name='progress' type='number' unit='%' />
							<div className={styles.group_button}>
								<div>
									<Button p_12_20 grey rounded_6 onClick={() => setUuidProgress('')}>
										Hủy bỏ
									</Button>
								</div>
								<div className={styles.btn}>
									<Button
										disable={!form.progress}
										p_12_20
										primary
										rounded_6
										icon={<FolderOpen size={18} color='#fff' />}
										onClick={() => {
											if (form.progress! < 0 || form.progress! > 100) {
												return toastWarn({msg: 'Phần trăm công việc từ 0 - 100 %'});
											}

											return funcProgressActiviti.mutate();
										}}
									>
										Lưu lại
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Popup>

				<PositionContainer
					open={!!_projectReport && !!_yearReport && !!_monthReport}
					onClose={() => {
						const {_projectReport, _yearReport, _monthReport, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				>
					<TableListActivityProjectReport
						onClose={() => {
							const {_projectReport, _yearReport, _monthReport, ...rest} = router.query;

							router.replace({
								pathname: router.pathname,
								query: {
									...rest,
								},
							});
						}}
					/>
				</PositionContainer>

				<PositionContainer
					open={!!_activityUuid}
					onClose={() => {
						const {_activityUuid, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				>
					<FormCreateContract
						nameActivity={nameActivity}
						uuidActivity={_activityUuid as string}
						queryKeys={[QUERY_KEY.table_list_work]}
						onClose={() => {
							const {_activityUuid, ...rest} = router.query;

							router.replace({
								pathname: router.pathname,
								query: {
									...rest,
								},
							});
						}}
					/>
				</PositionContainer>

				<PositionContainer
					open={!!_contractUuid}
					onClose={() => {
						const {_contractUuid, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				>
					<FormUpdateContract
						uuidContract={_contractUuid as string}
						queryKeys={[QUERY_KEY.table_list_work]}
						onClose={() => {
							const {_contractUuid, ...rest} = router.query;

							router.replace({
								pathname: router.pathname,
								query: {
									...rest,
								},
							});
						}}
					/>
				</PositionContainer>
			</Form>
		</div>
	);
}

export default MainPageWork;
