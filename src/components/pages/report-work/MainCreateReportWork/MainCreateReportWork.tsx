import React, {useState} from 'react';

import {PropsMainCreateReportWork} from './interfaces';
import styles from './MainCreateReportWork.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Select, {Option} from '~/components/common/Select';
import {generateYearsArray} from '~/common/funcs/selectDate';
import Form from '~/components/common/Form';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import projectServices from '~/services/projectServices';
import TextArea from '~/components/common/Form/components/TextArea';

function MainCreateReportWork({}: PropsMainCreateReportWork) {
	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const [form, setForm] = useState<any>({
		year: null,
		month: null,
		projectUuid: '',
		description: '',
	});

	const {data: listProject} = useQuery([QUERY_KEY.dropdown_project], {
		queryFn: () =>
			httpRequest({
				http: projectServices.categoryProject({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		select(data) {
			return data;
		},
	});

	return (
		<div className={styles.container}>
			{/* <Loading loading={funcCreateProject.isLoading} /> */}
			<Breadcrumb
				listUrls={[
					{
						path: PATH.ReportWork,
						title: 'Danh sách báo cáo',
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
						<Button p_14_24 rounded_8 blueLinear>
							Lưu lại
						</Button>
					</div>
				}
			/>
			<div className={styles.main}>
				<Form form={form} setForm={setForm}>
					<div className={styles.basic_info}>
						<div className={styles.head}>
							<h4>Thông tin cơ bản</h4>
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
								<Select
									isSearch={true}
									label={
										<span>
											Chọn dự án <span style={{color: 'red'}}>*</span>
										</span>
									}
									name='projectUuid'
									value={form.projectUuid}
									placeholder='Chọn'
								>
									{listProject?.map((v: any) => (
										<Option
											key={v?.uuid}
											value={v?.uuid}
											title={v?.name}
											onClick={() =>
												setForm((prev: any) => ({
													...prev,
													projectUuid: v?.uuid,
												}))
											}
										/>
									))}
								</Select>
							</div>
							<div className={styles.mt}>
								<TextArea name='description' placeholder='Nhập mô tả' label='Mô tả' />
							</div>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default MainCreateReportWork;
