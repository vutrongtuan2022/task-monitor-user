import Form, {FormContext, Input} from '~/components/common/Form';
import styles from './FormCreateIssue.module.scss';
import {ICreateIssue, PropsFormCreateIssue} from './interfaces';
import {memo, useState} from 'react';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import pnServices from '~/services/pnServices';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import {useRouter} from 'next/router';
import DatePicker from '~/components/common/DatePicker';
import {toastWarn} from '~/common/funcs/toast';
import moment from 'moment';

function FormCreateIssue({onClose}: PropsFormCreateIssue) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const {_uuidCreateNoticeDate} = router.query;

	const [form, setForm] = useState<ICreateIssue>({dateIssue: ''});

	const funcCreateNoticeDate = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm ngày cấp số thành công!',
				http: pnServices.updateNoticeDate({
					uuid: _uuidCreateNoticeDate as string,
					noticeDate: moment(form?.dateIssue).format('YYYY-MM-DD'),
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
		const dateIssue = new Date(new Date(form.dateIssue).toDateString()).getTime();
		const today = new Date(new Date().toDateString()).getTime();

		if (!form.dateIssue) {
			return toastWarn({msg: 'Vui lòng chọn ngày thông báo cấp vốn!'});
		}

		if (form.dateIssue && dateIssue < today) {
			return toastWarn({msg: 'Ngày thông báo cấp vốn không được nhỏ hơn ngày hiện tại!'});
		}

		funcCreateNoticeDate.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={funcCreateNoticeDate.isLoading} />
			<h4 className={styles.title}>Ngày trên thông báo cấp vốn</h4>

			<div className={styles.form}>
				{/* <Input
            placeholder='Nhập ngày cấp vốn'
            name='dateIssue'
            type='date'
            value={form.dateIssue}
            label={<span>Chọn ngày thông báo cấp vốn</span>}
          /> */}
				<DatePicker
					onClean={true}
					icon={true}
					label={<span>Chọn ngày thông báo cấp vốn</span>}
					name='dateIssue'
					value={form.dateIssue}
					placeholder='Nhập ngày cấp vốn'
					onSetValue={(date) =>
						setForm((prev) => ({
							...prev,
							dateIssue: date,
						}))
					}
				/>
				<div className={styles.groupBtnPopup}>
					<div>
						<Button p_12_20 rounded_8 white_outline onClick={onClose} maxContent>
							Hủy bỏ
						</Button>
					</div>
					<div>
						<Button bold rounded_8 p_12_20 disable={!form.dateIssue} onClick={handleSubmit}>
							Lưu lại
						</Button>
					</div>
				</div>
				<div className={styles.close} onClick={onClose}>
					<IoClose />
				</div>
			</div>
		</div>
	);
}

export default memo(FormCreateIssue);
