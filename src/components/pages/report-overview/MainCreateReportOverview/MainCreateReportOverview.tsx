import React, {useState} from 'react';

import {PropsMainCreateReportOverview} from './interfaces';
import styles from './MainCreateReportOverview.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Select, {Option} from '~/components/common/Select';
import {generateYearsArray} from '~/common/funcs/selectDate';
import {useMutation, useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import projectServices from '~/services/projectServices';
import {useRouter} from 'next/router';
import Loading from '~/components/common/Loading';
import overviewServices from '~/services/overviewServices';
import SelectMany from '~/components/common/SelectMany';
import InfoReportOverview from '../InfoReportOverview';

function MainCreateReportOverview({}: PropsMainCreateReportOverview) {
	const router = useRouter();
	const today = new Date();

	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const [projects, setProjects] = useState<any[]>([]);
	const [form, setForm] = useState<{
		year: number | null;
		month: number | null;
	}>({
		year: today.getFullYear(),
		month: today.getMonth() + 1,
	});

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

	const funcCreateReportOverview = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm báo cáo thành công!',
				http: overviewServices.upsertReportOverview({
					uuid: '',
					year: form.year!,
					month: form.month!,
					projectUuids: projects?.map((v) => v?.uuid),
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				router.back();
			}
		},
	});

	const handleSubmit = () => {
		return funcCreateReportOverview.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={funcCreateReportOverview.isLoading} />
			<Breadcrumb
				listUrls={[
					{
						path: PATH.ReportDisbursement,
						title: 'Báo cáo tổng hợp',
					},
					{
						path: '',
						title: 'Thêm mới báo cáo',
					},
				]}
				action={
					<div className={styles.group_btn}>
						<Button
							p_14_24
							rounded_8
							light-red
							onClick={(e) => {
								e.preventDefault();
								window.history.back();
							}}
						>
							Hủy bỏ
						</Button>
						<div className={styles.btn}>
							<Button p_14_24 rounded_8 blueLinear disable={!form.year || !form.month} onClick={handleSubmit}>
								Gửi báo cáo
							</Button>
						</div>
					</div>
				}
			/>
			<div className={styles.main}>
				<div className={styles.basic_info}>
					<div className={styles.head}>
						<h4>Thông tin tổng hợp</h4>
					</div>
					<div className={styles.form}>
						<div className={styles.col_2}>
							<div className={styles.col_2}>
								<Select
									isSearch={true}
									label={
										<span>
											Kế hoạch năm <span style={{color: 'red'}}>*</span>
										</span>
									}
									name='year'
									value={form.year}
									placeholder='Chọn'
								>
									{years?.map((v: any) => (
										<Option
											key={v}
											value={v}
											title={`Năm ${v}`}
											onClick={() =>
												setForm((prev: any) => ({
													...prev,
													year: v,
												}))
											}
										/>
									))}
								</Select>
								<div>
									<Select
										isSearch={true}
										label={
											<span>
												Kế hoạch tháng <span style={{color: 'red'}}>*</span>
											</span>
										}
										name='month'
										value={form.month}
										placeholder='Chọn'
									>
										{months?.map((v: any) => (
											<Option
												key={v}
												value={v}
												title={`Tháng ${v}`}
												onClick={() =>
													setForm((prev: any) => ({
														...prev,
														month: v,
													}))
												}
											/>
										))}
									</Select>
								</div>
							</div>
							<SelectMany
								placeholder='Chọn'
								label={
									<span>
										Danh sách dự án <span style={{color: 'red'}}>*</span>
									</span>
								}
								value={projects}
								setValue={(prj) =>
									setProjects(
										projects?.find((v: any) => v?.uuid == prj.uuid)
											? projects?.filter((v: any) => v?.uuid != prj.uuid)
											: [...projects, prj]
									)
								}
								setValueAray={setProjects}
								listData={listProject?.map((v: any) => ({
									uuid: v?.uuid,
									title: v?.name,
									code: v?.code,
								}))}
							/>
						</div>
					</div>
				</div>

				{projects?.map((v, i) => (
					<InfoReportOverview key={v?.uuid} index={i} year={form?.year!} month={form?.month!} projectUuid={v?.uuid} />
				))}
			</div>
		</div>
	);
}

export default MainCreateReportOverview;
