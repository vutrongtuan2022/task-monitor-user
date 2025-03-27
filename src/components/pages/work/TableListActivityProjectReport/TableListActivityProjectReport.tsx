import Button from '~/components/common/Button';
import {IWorkDigitize, PropsTableListActivityProjectReport} from './interfaces';
import styles from './TableListActivityProjectReport.module.scss';
import {FolderOpen} from 'iconsax-react';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, STATE_COMPLETE_REPORT, STATE_WORK, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import activityServices from '~/services/activityServices';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import StateActive from '~/components/common/StateActive';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Tippy from '@tippyjs/react';
import {useCallback, useMemo, useState} from 'react';
import reportServices from '~/services/reportServices';
import Loading from '~/components/common/Loading';

function TableListActivityProjectReport({onClose}: PropsTableListActivityProjectReport) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_projectReport, _yearReport, _monthReport} = router.query;

	const [listWorkChecked, setListWorkChecked] = useState<IWorkDigitize[]>([]);

	// Data reponsive api
	const {data: listWorkReport, isLoading} = useQuery(
		[QUERY_KEY.table_list_work_project_report, _projectReport, _yearReport, _monthReport],
		{
			queryFn: () =>
				httpRequest({
					http: activityServices.getAllActivityReport({
						uuid: '',
						projectUuid: _projectReport as string,
						status: STATUS_CONFIG.ACTIVE,
						year: Number(_yearReport),
						month: Number(_monthReport),
					}),
				}),
			onSuccess(data) {
				if (data) {
					setListWorkChecked(data?.filter((v: any) => v?.digitalizedState == 1));
				}
			},
			select(data) {
				return data;
			},
			enabled: !!_projectReport && !!_yearReport && !!_monthReport,
		}
	);

	// Xử lý check all ==> Thêm tất cả dữ liệu api trả về vào mảng state
	const handleCheckedAll = useCallback(
		(e: any) => {
			const {checked} = e.target;

			if (checked) {
				setListWorkChecked((prev: any) => [...prev, ...listWorkReport]);
			} else {
				setListWorkChecked((prev: any) => {
					return prev?.filter((v: any) => listWorkReport?.every((x: any) => x?.activityUuid != v?.activityUuid));
				});
			}
		},
		[listWorkReport]
	);

	// Xử lý check row (item)
	const handleCheckedRow = (e: any, data: any) => {
		const {checked} = e.target;

		if (checked) {
			setListWorkChecked((prev: any) => [...prev, data]);
		} else {
			setListWorkChecked((prev: any) => {
				return prev?.filter((v: any) => v?.activityUuid != data?.activityUuid);
			});
		}
	};

	// Xử lý trạng thái checked của row (item)
	const handleIsCheckedRow = (data: any) => {
		return listWorkChecked?.some((v) => v?.activityUuid == data?.activityUuid);
	};

	// Xử lý trạng thái checked all
	const isCheckedAll = useMemo(() => {
		return listWorkReport?.every((v: any) => {
			return listWorkChecked?.some((x: any) => x?.activityUuid == v?.activityUuid);
		});
	}, [listWorkReport, listWorkChecked]);

	const funcSendReport = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xác nhận báo cáo thành công!',
				http: reportServices.userSendReportTwo({
					projectUuid: _projectReport as string,
					year: Number(_yearReport),
					month: Number(_monthReport),
					activityDigitalState: listWorkReport?.map((v: any) => ({
						activityUuid: v?.activityUuid,
						stateNote: listWorkChecked.some((x) => x.activityUuid == v.activityUuid) ? 1 : 0,
					})),
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				onClose();
				queryClient.invalidateQueries([QUERY_KEY.table_list_work]);
			}
		},
	});

	return (
		<div className={styles.container}>
			<Loading loading={funcSendReport.isLoading} />
			<div className={styles.head}>
				<h4 className={styles.title}>Xác nhận báo cáo công việc</h4>
				<div className={styles.group_button}>
					<div>
						<Button p_12_20 grey rounded_6 onClick={onClose}>
							Hủy bỏ
						</Button>
					</div>

					<div className={styles.btn}>
						<Button
							p_12_20
							primary
							rounded_6
							icon={<FolderOpen size={18} color='#fff' />}
							disable={listWorkReport?.length == 0}
							onClick={funcSendReport.mutate}
						>
							Xác nhận
						</Button>
					</div>
				</div>
			</div>
			<div className={styles.line}></div>
			<div className={styles.form}>
				<WrapperScrollbar isWrappreTable={false}>
					<DataWrapper
						data={listWorkReport || []}
						loading={isLoading}
						noti={<Noti title='Danh sách trống!' des='Danh sách công việc trống!' />}
					>
						<Table
							fixedHeader={true}
							isCheckedAll={isCheckedAll}
							handleCheckedAll={handleCheckedAll}
							handleCheckedRow={handleCheckedRow}
							handleIsCheckedRow={handleIsCheckedRow}
							data={listWorkReport || []}
							column={[
								{
									title: 'STT',
									render: (data: IWorkDigitize, index: number) => <>{index + 1}</>,
								},
								{
									title: 'Tên công việc',
									render: (data: IWorkDigitize) => (
										<Tippy content={data?.name}>
											<p className={styles.name}>{data?.name || '---'}</p>
										</Tippy>
									),
								},
								{
									title: 'Thuộc nhóm công việc',
									render: (data: IWorkDigitize) => (
										<Tippy content={data?.parent?.name || '---'}>
											<p className={styles.group_task}>{data?.parent?.name || '---'}</p>
										</Tippy>
									),
								},
								{
									title: 'Giai đoạn thực hiện',
									render: (data: IWorkDigitize) => (
										<>
											{data?.stage == -1 && '---'}
											{data?.stage == 1 && 'Giai đoạn chuẩn bị đầu tư'}
											{data?.stage == 2 && 'Giai đoạn thực hiện đầu tư'}
											{data?.stage == 3 && 'Giai đoạn kết thúc đầu tư'}
										</>
									),
								},
								{
									title: 'Megatype',
									render: (data: IWorkDigitize) => <>{data?.megaType || '---'}</>,
								},
								{
									title: 'Trạng thái',
									render: (data: IWorkDigitize) => (
										<StateActive
											stateActive={data?.state}
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
									),
								},
								{
									title: 'Tình trạng',
									render: (data: IWorkDigitize) => (
										<StateActive
											isBox={false}
											stateActive={data?.completeState}
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
								// {
								// 	title: 'Đã số hóa',
								// 	checkBox: true,
								// 	render: (data: IWorkDigitize) => <></>,
								// },
							]}
						/>
					</DataWrapper>
				</WrapperScrollbar>
			</div>
		</div>
	);
}

export default TableListActivityProjectReport;
