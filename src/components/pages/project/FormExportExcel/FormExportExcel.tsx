import {useMutation, useQuery} from '@tanstack/react-query';
import styles from './FormExportExcel.module.scss';
import {PropsFormExportExcel} from './interfaces';
import {memo, useState} from 'react';
import {QUERY_KEY, SORT_TYPE, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import projectServices from '~/services/projectServices';
import Loading from '~/components/common/Loading';
import SelectMany from '~/components/common/SelectMany';
import DatePicker from '~/components/common/DatePicker';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import moment from 'moment';
import {useRouter} from 'next/router';

function FormExportExcel({onClose}: PropsFormExportExcel) {
	const router = useRouter();

	const [projects, setProjects] = useState<any[]>([]);
	const [form, setForm] = useState<{
		fromDate: string;
		toDate: string;
	}>({
		fromDate: '',
		toDate: '',
	});
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);

	const {_page, _pageSize, _keyword, _status, _state, _userUuid, _managerUuid} = router.query;

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

	const exportExcel = useMutation({
		mutationFn: () => {
			return httpRequest({
				http: projectServices.exportProject({
					// projects: projects?.map((v: any) => v?.uuid),
					// from: form.fromDate ? moment(form.fromDate).format('YYYY-MM-DD') : null,
					// to: form.toDate ? moment(form.toDate).format('YYYY-MM-DD') : null,
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 10,
					keyword: (_keyword as string) || '',
					status: STATUS_CONFIG.ACTIVE,
					state: !!_state ? Number(_state) : null,
					userUuid: (_userUuid as string) || '',
					managerUuid: (_managerUuid as string) || '',
					sort: {
						column: null,
						type: null,
					},
					from: date?.from ? moment(date.from).startOf('day').format('YYYY-MM-DDTHH:mm:ss') : null,
					to: date?.to ? moment(date.to).endOf('day').format('YYYY-MM-DDTHH:mm:ss') : null,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				window.open(`${process.env.NEXT_PUBLIC_PATH_EXPORT}/${data}`, '_blank');
			}
		},
	});

	const handleExportExcel = () => {
		return exportExcel.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={exportExcel.isLoading} />
			<h4 className={styles.title}>Xuất dự án</h4>
			<div className={styles.form}>
				<div className={styles.main_form}>
					<div className={styles.mt}>
						<SelectMany
							placeholder='Tất cả dự án'
							label={<span>Chọn dự án</span>}
							value={projects}
							setValue={(prj) =>
								setProjects(
									projects?.find((v: any) => v?.uuid == prj.uuid)
										? projects?.filter((v: any) => v?.uuid != prj.uuid)
										: [...projects, prj]
								)
							}
							listData={listProject?.map((v: any) => ({
								uuid: v?.uuid,
								title: v?.name,
								code: v?.code,
							}))}
						/>
					</div>
					<div className={styles.mt}>
						<div className={styles.col_2}>
							<DatePicker
								onClean={true}
								icon={true}
								label={<span>Từ ngày</span>}
								placeholder='Chọn từ ngày'
								value={form?.fromDate}
								onSetValue={(date) =>
									setForm((prev) => ({
										...prev,
										fromDate: date,
									}))
								}
								name='fromDate'
							/>
							<div>
								<DatePicker
									onClean={true}
									icon={true}
									label={<span>Đến Ngày</span>}
									placeholder='Chọn đến ngày'
									value={form?.toDate}
									onSetValue={(date) =>
										setForm((prev) => ({
											...prev,
											toDate: date,
										}))
									}
									name='toDate'
								/>
							</div>
						</div>
					</div>
					<div className={styles.group_button}>
						<div>
							<Button p_12_20 white_outline rounded_6 onClick={onClose}>
								Hủy bỏ
							</Button>
						</div>
						<div className={styles.btn} onClick={handleExportExcel}>
							<Button p_12_20 primary rounded_6>
								Xác nhận
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.close} onClick={onClose}>
				<IoClose size={28} color='#9EA5C0' />
			</div>
		</div>
	);
}

export default memo(FormExportExcel);
