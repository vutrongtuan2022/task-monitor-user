import React, {useState} from 'react';

import {PropsMainCreateReportDisbursement} from './interfaces';
import styles from './MainCreateReportDisbursement.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Select, {Option} from '~/components/common/Select';
import {generateYearsArray} from '~/common/funcs/selectDate';
import Form, {FormContext, Input} from '~/components/common/Form';
import {useMutation, useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import projectServices from '~/services/projectServices';
import TextArea from '~/components/common/Form/components/TextArea';
import projectFundServices from '~/services/projectFundServices';
import {price} from '~/common/funcs/convertCoin';
import {useRouter} from 'next/router';
import Loading from '~/components/common/Loading';

function MainCreateReportDisbursement({}: PropsMainCreateReportDisbursement) {
	const router = useRouter();

	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const [form, setForm] = useState<{
		year: number | null;
		month: number | null;
		projectUuid: string;
		budget: number;
		description: string;
	}>({
		year: null,
		month: null,
		projectUuid: '',
		budget: 0,
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

	const funcCreateProjectFund = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm báo cáo thành công!',
				http: projectFundServices.createProjectFund({
					year: form.year!,
					month: form.month!,
					projectUuid: form.projectUuid,
					budget: price(form.budget),
					note: form.description,
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
		return funcCreateProjectFund.mutate();
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
			<div className={styles.container}>
				<Loading loading={funcCreateProjectFund.isLoading} />
				<Breadcrumb
					listUrls={[
						{
							path: PATH.ReportDisbursement,
							title: 'Báo cáo giải ngân',
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
							<FormContext.Consumer>
								{({isDone}) => (
									<div className={styles.btn}>
										<Button
											p_14_24
											rounded_8
											blueLinear
											disable={!isDone || !form.year || !form.month || !form.projectUuid}
										>
											Gửi báo cáo
										</Button>
									</div>
								)}
							</FormContext.Consumer>
						</div>
					}
				/>
				<div className={styles.main}>
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
							<div className={styles.mt}>
								<Input
									label={
										<span>
											Số tiền giải ngân <span style={{color: 'red'}}>*</span>
										</span>
									}
									placeholder='Nhập số tiền giải ngân'
									type='text'
									isMoney
									name='budget'
									value={form?.budget}
									isRequired={true}
									blur={true}
									unit='VND'
								/>
							</div>
							<div className={styles.mt}>
								<TextArea name='description' placeholder='Nhập mô tả' label='Mô tả' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Form>
	);
}

export default MainCreateReportDisbursement;
