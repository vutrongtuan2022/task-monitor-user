import React, {useState} from 'react';
import {PropsFormReportsMonthly} from './interfaces';
import styles from './FormReportsMonthly.module.scss';
import {IoClose} from 'react-icons/io5';
import Select, {Option} from '~/components/common/Select';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import projectServices from '~/services/projectServices';
import {httpRequest} from '~/services';
import {generateYearsArray} from '~/common/funcs/selectDate';
import Button from '~/components/common/Button';
import {useRouter} from 'next/router';

function FormReportsMonthly({onClose}: PropsFormReportsMonthly) {
	const today = new Date();
	const router = useRouter();

	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const [form, setForm] = useState<{
		year: number;
		month: number;
		projectUuid: string;
	}>({
		year: today.getFullYear(),
		month: today.getMonth() + 1,
		projectUuid: '',
	});

	const {data: listProject} = useQuery([QUERY_KEY.dropdown_project_by_month, form?.year, form?.month], {
		queryFn: () =>
			httpRequest({
				http: projectServices.categoryProjectHaveReport({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					excludeState: null,
					year: form.year,
					month: form.month,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.year && !!form?.month,
	});

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Gửi báo cáo tháng</h4>
			<div className={styles.form}>
				<div className={styles.main_form}>
					<div className={styles.mt}>
						<div className={styles.col_2}>
							<Select
								isSearch={true}
								label={
									<span>
										Năm <span style={{color: 'red'}}>*</span>
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
											Tháng <span style={{color: 'red'}}>*</span>
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
					</div>
					<div className={styles.mt}>
						<Select
							isSearch={true}
							label={
								<span>
									Chọn công trình <span style={{color: 'red'}}>*</span>
								</span>
							}
							name='projectUuid'
							value={form.projectUuid}
							placeholder='Chọn công trình'
						>
							{listProject?.map((v: any) => (
								<Option
									key={v?.uuid}
									value={v?.uuid}
									title={v?.name}
									onClick={() => {
										setForm((prev: any) => ({
											...prev,
											projectUuid: v?.uuid,
										}));
									}}
								/>
							))}
						</Select>
					</div>
					<div className={styles.group_button}>
						<div>
							<Button p_12_20 white_outline rounded_6 onClick={onClose}>
								Hủy bỏ
							</Button>
						</div>
						<div
							className={styles.btn}
							onClick={() => {
								onClose();
								router.replace({
									pathname: router.pathname,
									query: {
										...router.query,
										_projectReport: form.projectUuid,
										_yearReport: form.year,
										_monthReport: form.month,
									},
								});
							}}
						>
							<Button p_12_20 primary rounded_6 disable={!form.projectUuid}>
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

export default FormReportsMonthly;
