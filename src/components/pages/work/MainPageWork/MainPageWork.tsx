import React, {useState} from 'react';

import {IWork, PropsMainPageWork} from './interfaces';
import styles from './MainPageWork.module.scss';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import {QUERY_KEY, STATE_COMPLETE_REPORT, STATE_REPORT_WORK, STATUS_CONFIG, TYPE_OF_WORK} from '~/constants/config/enum';
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
import {DiscountShape, FolderOpen, PenAdd, TickCircle} from 'iconsax-react';
import Tippy from '@tippyjs/react';
import Dialog from '~/components/common/Dialog';
import icons from '~/constants/images/icons';
import Loading from '~/components/common/Loading';
import Popup from '~/components/common/Popup';
import Form, {Input} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import Button from '~/components/common/Button';
import {toastWarn} from '~/common/funcs/toast';

function MainPageWork({}: PropsMainPageWork) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const {_page, _pageSize, _keyword, _state, _year, _month, _type} = router.query;

	const [form, setForm] = useState<{issue: string; progress: number | null}>({
		issue: '',
		progress: null,
	});

	const [uuidConfirm, setUuidConfirm] = useState<string>('');
	const [uuidFinish, setUuidFinish] = useState<string>('');
	const [uuidIssue, setUuidIssue] = useState<string>('');
	const [uuidProgress, setUuidProgress] = useState<string>('');

	const listWork = useQuery([QUERY_KEY.table_list_work, _page, _pageSize, _keyword, _state, _year, _month, _type], {
		queryFn: () =>
			httpRequest({
				http: activityServices.listActivityForAction({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: (_keyword as string) || '',
					status: STATUS_CONFIG.ACTIVE,
					state: !!_state ? Number(_state) : null,
					year: !!_year ? Number(_year) : null,
					month: !!_month ? Number(_month) : null,
					type: !!_type ? Number(_type) : null,
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
					type: 0, // 0: Cập nhật thông tin, 1: Xác nhận xử lý, 2: Xác nhận hoàn thành
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

	return (
		<div className={styles.container}>
			<Loading
				loading={
					funcConfirmActiviti.isLoading ||
					funcFinishActiviti.isLoading ||
					funcIssueActiviti.isLoading ||
					funcProgressActiviti.isLoading
				}
			/>
			<div className={styles.head}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo tên công việc, dự án' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_state'
							listFilter={[
								{
									id: STATE_REPORT_WORK.NOT_PROCESSED,
									name: 'Chưa xử lý',
								},
								{
									id: STATE_REPORT_WORK.PROCESSING,
									name: 'Đang xử lý',
								},
								{
									id: STATE_REPORT_WORK.COMPLETED,
									name: 'Đã hoàn thành',
								},
							]}
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
								render: (data: IWork, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Tháng báo cáo',
								fixedLeft: true,
								render: (data: IWork) => (
									<>
										Tháng <span>{data?.month}</span> - <span>{data?.year}</span>
									</>
								),
							},
							{
								title: 'Tên công trình',
								render: (data: IWork) => <>{data?.project?.name}</>,
							},
							{
								title: 'Megatype',
								render: (data: IWork) => <>{data?.megatype || '---'}</>,
							},
							{
								title: 'Tên công việc',
								render: (data: IWork) => (
									<Tippy content={data?.activity?.name}>
										<p className={styles.name}>{data?.activity?.name}</p>
									</Tippy>
								),
							},
							{
								title: 'Giai đoạn thực hiện',
								render: (data: IWork) => (
									<>
										{data?.stage == -1 || (!data?.stage && '---')}
										{data?.stage == 1 && 'Giai đoạn chuẩn bị đầu tư'}
										{data?.stage == 2 && 'Giai đoạn thực hiện đầu tư'}
										{data?.stage == 3 && 'Giai đoạn kết thúc đầu tư'}
									</>
								),
							},

							{
								title: 'Loại công việc',
								render: (data: IWork) => (
									<>
										{!data?.isInWorkFlow && 'Phát sinh'}
										{data?.isInWorkFlow && 'Có kế hoạch'}
									</>
								),
							},
							{
								title: 'Khó khăn vướng mắc',
								render: (data: IWork) => (
									<Tippy content={data?.issue || '---'}>
										<p className={styles.issue}>{data?.issue || '---'}</p>
									</Tippy>
								),
							},
							{
								title: 'Tiến độ công việc',
								render: (data: IWork) => <Progress percent={data?.progress} width={80} />,
							},
							{
								title: 'Trạng thái',
								render: (data: IWork) => (
									<StateActive
										stateActive={data?.activity?.state}
										listState={[
											{
												state: STATE_REPORT_WORK.NOT_PROCESSED,
												text: 'Chưa xử lý',
												textColor: '#fff',
												backgroundColor: '#F37277',
											},
											{
												state: STATE_REPORT_WORK.PROCESSING,
												text: 'Đang xử lý',
												textColor: '#fff',
												backgroundColor: '#16C1F3',
											},
											{
												state: STATE_REPORT_WORK.COMPLETED,
												text: 'Đã hoàn thành',
												textColor: '#fff',
												backgroundColor: '#06D7A0',
											},
										]}
									/>
								),
							},
							{
								title: 'Tình trạng',
								render: (data: IWork) => (
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
								),
							},
							{
								title: 'Số hóa',
								render: (data: IWork) => (
									<>
										{data?.digitalizedState == 0 && 'Chưa số hóa'}
										{data?.digitalizedState == 1 && 'Đã số hóa'}
									</>
								),
							},
							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: IWork) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										{data?.activity?.state == STATE_REPORT_WORK.NOT_PROCESSED && (
											<IconCustom
												color='#4BC9F0'
												icon={<TickCircle fontSize={20} fontWeight={600} />}
												tooltip='Xác nhận xử lý'
												onClick={() => setUuidConfirm(data?.activity?.uuid)}
											/>
										)}

										{data?.activity?.state == STATE_REPORT_WORK.PROCESSING && (
											<>
												<IconCustom
													color='#2970FF'
													icon={<PenAdd fontSize={20} fontWeight={600} />}
													tooltip='Nhập khó khăn vướng mắc'
													onClick={() => {
														setUuidIssue(data?.activity?.uuid);
														setForm({
															issue: data?.issue || '',
															progress: data?.progress || null,
														});
													}}
												/>
												<IconCustom
													color='#5B70B3'
													icon={<DiscountShape fontSize={20} fontWeight={600} />}
													tooltip='Nhập tiến độ'
													onClick={() => {
														setUuidProgress(data?.activity?.uuid);
														setForm({
															issue: data?.issue || '',
															progress: data?.progress || null,
														});
													}}
												/>
												<IconCustom
													color='#06D7A0'
													icon={<TickCircle fontSize={20} fontWeight={600} />}
													tooltip='Xác nhận hoàn thành'
													onClick={() => setUuidFinish(data?.activity?.uuid)}
												/>
											</>
										)}
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 20}
					total={listWork?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _state, _year, _month, _type]}
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
			</Form>
		</div>
	);
}

export default MainPageWork;
