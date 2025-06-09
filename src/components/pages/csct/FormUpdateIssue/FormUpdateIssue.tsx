import Form, {FormContext, Input} from '~/components/common/Form';
import styles from './FormUpdateIssue.module.scss';
import {IUpdateIssue, PropsFormUpdateIssue} from './interfaces';
import {memo, useState} from 'react';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import pnServices from '~/services/pnServices';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import {toastWarn} from '~/common/funcs/toast';
import moment from 'moment';
import {timeSubmit} from '~/common/funcs/optionConvert';

function FormUpdateIssue({onClose}: PropsFormUpdateIssue) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const {_uuidUpdateNoticeDate} = router.query;

	const [form, setForm] = useState<IUpdateIssue>({dateIssue: ''});

	useQuery([QUERY_KEY.detail_csct, _uuidUpdateNoticeDate], {
		queryFn: () =>
			httpRequest({
				http: pnServices.detailPN({
					uuid: _uuidUpdateNoticeDate as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					dateIssue: moment(data?.noticeDate).format('YYYY-MM-DD') || '',
				});
			}
		},
		select(data) {
			return data;
		},
		enabled: !!_uuidUpdateNoticeDate,
	});

	const funcUpdateNoticeDate = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm ngày cấp số thành công!',
				http: pnServices.updateNoticeDate({
					uuid: _uuidUpdateNoticeDate as string,
					noticeDate: form?.dateIssue,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				onClose();
				setForm({
					dateIssue: '',
				});
				queryClient.invalidateQueries([QUERY_KEY.table_CSCT]);
			}
		},
	});

	const handleSubmit = () => {
		const today = new Date(timeSubmit(new Date())!);
		const dateIssue = form.dateIssue ? new Date(form.dateIssue) : null;
		if (!dateIssue) {
			return toastWarn({msg: 'Vui lòng chọn ngày thông báo cấp vốn!'});
		}
		if (!dateIssue || today > dateIssue) {
			return toastWarn({msg: 'Ngày thông báo cấp vốn không được nhỏ hơn ngày hiện tại!'});
		}

		funcUpdateNoticeDate.mutate();
	};
	console.log('date', form?.dateIssue);
	return (
		<div className={styles.container}>
			<Loading loading={funcUpdateNoticeDate.isLoading} />
			<h4 className={styles.title}>Ngày trên thông báo cấp vốn</h4>

			<div className={styles.form}>
				<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
					<Input
						placeholder='Nhập ngày cấp vốn'
						name='dateIssue'
						type='date'
						value={form.dateIssue}
						label={<span>Chọn ngày thông báo cấp vốn</span>}
					/>

					<div className={styles.groupBtnPopup}>
						<div>
							<Button p_12_20 rounded_8 white_outline onClick={onClose} maxContent>
								Hủy bỏ
							</Button>
						</div>
						<div>
							<FormContext.Consumer>
								{({isDone}) => (
									<Button bold rounded_8 p_12_20 disable={!isDone}>
										Lưu lại
									</Button>
								)}
							</FormContext.Consumer>
						</div>
					</div>
					<div className={styles.close} onClick={onClose}>
						<IoClose />
					</div>
				</Form>
			</div>
		</div>
	);
}

export default memo(FormUpdateIssue);
