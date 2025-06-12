import GridColumn from '~/components/layouts/GridColumn';
import styles from './CSCTItemForm.module.scss';
import {PropsCSCTItemForm} from './interfaces';
import {memo} from 'react';
import DatePicker from '~/components/common/DatePicker';
import {convertCoin, price} from '~/common/funcs/convertCoin';
import {TYPE_CONTRACT_PN} from '~/constants/config/enum';
import {Trash} from 'iconsax-react';

function CSCTItemForm({index, form, setForm, contract, handleDelete}: PropsCSCTItemForm) {
	const handleChangeValue = (index: number, name: string, value: any, isConvert?: boolean) => {
		const newData = [...form?.listContract];

		if (isConvert) {
			if (!Number(price(value))) {
				newData[index] = {
					...newData[index],
					[name]: 0,
				};
			}

			newData[index] = {
				...newData[index],
				[name]: convertCoin(Number(price(value))),
			};
		} else {
			newData[index] = {
				...newData[index],
				[name]: value,
			};
		}

		setForm((prev: any) => ({
			...prev,
			listContract: newData,
		}));
	};

	return (
		<div className={styles.container}>
			<div className={styles.basic_info}>
				<div className={styles.head}>
					<h4>Hợp đồng {contract?.code}</h4>
					<div className={styles.delete} onClick={handleDelete}>
						<Trash size={22} color='#EE464C' />
					</div>
				</div>
				<div className={styles.main}>
					<GridColumn col_3>
						<DatePicker
							onClean={true}
							icon={true}
							readonly={true}
							label={
								<span>
									Ngày lấy số <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Chọn ngày lấy số'
							value={contract?.startDate}
							onSetValue={(date) => {}}
							name='startDate'
						/>
						<div>
							<p className={styles.label}>
								Nhóm nhà thầu <span style={{color: 'red'}}>*</span>
							</p>
							<div className={styles.input_specification}>
								<input
									name='value'
									type='text'
									placeholder='Nhập nhóm nhà thầu'
									className={styles.input}
									readOnly={true}
									disabled={true}
									value={contract?.contractorLinks?.contractorCat?.name}
								/>
							</div>
						</div>
						<div>
							<p className={styles.label}>
								Tên nhà thầu <span style={{color: 'red'}}>*</span>
							</p>
							<div className={styles.input_specification}>
								<input
									name='value'
									type='text'
									placeholder='Nhập tên nhà thầu'
									className={styles.input}
									readOnly={true}
									disabled={true}
									value={contract?.contractorLinks?.contractor?.name}
								/>
							</div>
						</div>
						<div>
							<p className={styles.label}>
								Giá trị đề nghị thanh toán <span style={{color: 'red'}}>*</span>
							</p>
							<div className={styles.input_specification}>
								<input
									name='value'
									type='text'
									placeholder='Nhập giá trị đề nghị thanh toán'
									className={styles.input}
									value={contract?.amount}
									onChange={(e) => handleChangeValue(index, 'amount', e.target.value, true)}
								/>
								<div className={styles.unit}>VNĐ</div>
							</div>
						</div>
						<div>
							<p className={styles.label}>
								Phân loại <span style={{color: 'red'}}>*</span>
								<div className={styles.group_radio}>
									<div className={styles.item_radio}>
										<input
											id={`type_pay_${index}`}
											className={styles.input_radio}
											type='radio'
											value={contract.type}
											checked={contract.type == TYPE_CONTRACT_PN.PAY}
											onChange={() => handleChangeValue(index, 'type', TYPE_CONTRACT_PN.PAY)}
										/>
										<label className={styles.input_lable} htmlFor={`type_pay_${index}`}>
											Thanh toán
										</label>
									</div>

									<div className={styles.item_radio}>
										<input
											id={`type_advance_${index}`}
											className={styles.input_radio}
											type='radio'
											value={contract.type}
											checked={contract.type == TYPE_CONTRACT_PN.ADVANCE}
											onChange={() => handleChangeValue(index, 'type', TYPE_CONTRACT_PN.ADVANCE)}
										/>
										<label className={styles.input_lable} htmlFor={`type_advance_${index}`}>
											Tạm ứng
										</label>
									</div>
								</div>
							</p>
						</div>
					</GridColumn>
					<div className={styles.mt}>
						<div>
							<p className={styles.label}>
								Nội dung thanh toán <span style={{color: 'red'}}>*</span>
							</p>
							<div className={styles.input_specification}>
								<textarea
									name='note'
									value={contract.note}
									placeholder='Nhập nội dung'
									className={styles.input}
									onChange={(e) => handleChangeValue(index, 'note', e.target.value)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(CSCTItemForm);
