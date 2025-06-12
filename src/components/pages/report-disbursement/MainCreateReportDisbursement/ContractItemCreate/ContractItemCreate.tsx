import React, {useState} from 'react';
import styles from './ContractItemCreate.module.scss';
import {PropsContractItemCreate} from './interfaces';
import StateActive from '~/components/common/StateActive';
import {STATE_WORK} from '~/constants/config/enum';
import GridColumn from '~/components/layouts/GridColumn';
import Progress from '~/components/common/Progress';
import DatePicker from '~/components/common/DatePicker';
import {convertCoin} from '~/common/funcs/convertCoin';
import Moment from 'react-moment';
import {Trash} from 'iconsax-react';
import clsx from 'clsx';
import Tippy from '@tippyjs/react';

function ContractItemCreate({index, contract, handleChangeValue, handleDelete}: PropsContractItemCreate) {
	const [collapsed, setCollapsed] = useState(false);

	const handleToggle = () => {
		setCollapsed(!collapsed);
	};
	return (
		<div className={styles.container}>
			<div className={styles.basic_info}>
				<div className={styles.head}>
					<h4>Thông tin hợp đồng</h4>
					<p className={styles.toggle_btn} onClick={handleToggle}>
						{collapsed ? 'Xem chi tiết ▼ ' : 'Thu gọn ▲ '}
					</p>
				</div>
				{collapsed == false ? (
					<>
						<div className={styles.main}>
							<GridColumn col_4>
								<div className={styles.item}>
									<p>Số hợp đồng</p>
									<p>{contract?.code || '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Tên công việc</p>
									<p>{contract?.activityDTO?.name || '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Tên nhà thầu</p>
									<p>{contract?.contractorInfos?.map((v) => v?.contractorName).join(', ')}</p>
								</div>
								<div className={styles.item}>
									<p>Trạng thái công việc</p>
									<StateActive
										stateActive={contract?.activityDTO?.state}
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
								</div>
								<div className={styles.item}>
									<p>Tên nhóm nhà thầu</p>
									<p>{contract?.contractorInfos?.map((v) => v?.contractorCatName).join(', ')}</p>
								</div>
								<div className={styles.item}>
									<p>Lũy kế giải ngân hiện tại</p>
									<p>
										<span style={{color: '#EE464C'}}>{convertCoin(contract?.accumAmount) || '---'}</span> /{' '}
										<span>{convertCoin(contract?.amount) || '---'}</span>
									</p>
								</div>
								<div className={styles.item}>
									<p>Lũy kế giải ngân trong năm</p>
									<p>{convertCoin(contract?.accumAmountThisYear) || '---'}</p>
								</div>

								<div className={styles.item}>
									<p>Tiến độ giải ngân</p>
									<Progress percent={contract?.progress} width={80} />
								</div>

								<div className={styles.item}>
									<p>Ngày ký hợp đồng</p>
									<p>{contract?.startDate ? <Moment date={contract?.startDate} format='DD/MM/YYYY' /> : '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Giá trị hợp đồng</p>
									<p>{convertCoin(contract?.amount) || '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Thời gian THHĐ (ngày)</p>
									<p>{contract?.totalDayAdvantage || '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Giá trị BLTHHĐ</p>
									<p>{convertCoin(contract?.contractExecution?.amount) || '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Ngày kết thúc BLTHHĐ</p>
									<p>
										{contract?.contractExecution?.endDate ? (
											<Moment date={contract?.contractExecution?.endDate} format='DD/MM/YYYY' />
										) : (
											'---'
										)}
									</p>
								</div>
								<div className={styles.item}>
									<p>Giá trị BLTƯ</p>
									<p>{convertCoin(contract?.advanceGuarantee?.amount) || '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Ngày kết thúc BLTƯ</p>
									<p>
										{contract?.advanceGuarantee?.endDate ? (
											<Moment date={contract?.advanceGuarantee?.endDate} format='DD/MM/YYYY' />
										) : (
											'---'
										)}
									</p>
								</div>
							</GridColumn>
						</div>
						<div>
							<div className={styles.head}>
								<h4>Thông tin giải ngân kỳ này</h4>
							</div>
							<div className={styles.main}>
								<GridColumn col_2>
									<div>
										<p className={clsx(styles.label)}>Thuộc cấp số chấp thuận thanh toán</p>
										<div className={styles.input_specification}>
											<input
												name='value'
												type='text'
												placeholder='Nhập cấp số chấp thuận'
												className={clsx(styles.input, styles.readOnly)}
												readOnly={true}
												disabled={true}
												value={contract?.pnContract?.map((v) => v?.pn?.code)}
											/>
										</div>
									</div>
									<div>
										<p className={styles.label}>Nhà thầu</p>
										<div className={styles.input_contractor}>
											<input
												name='value'
												type='text'
												placeholder='Nhập nhà thầu'
												className={clsx(styles.input, styles.readOnly)}
												readOnly={true}
												disabled={true}
												value={contract?.pnContract?.flatMap((v) =>
													v?.contract?.contractorLinks?.map((a) => a?.contractor?.name || '')
												)}
											/>
											<div className={styles.delete} onClick={() => {}}>
												<Trash size={22} color='#EE464C' />
											</div>
										</div>
									</div>

									<div>
										<div>
											<p className={clsx(styles.label)}>Sử dụng vốn dự phòng</p>
											<div className={styles.input_specification}>
												<input
													name='value'
													type='text'
													placeholder='Nhập Sử dụng vốn dự phòng'
													className={styles.input}
													value={contract?.reverseAmount}
													onChange={(e) => handleChangeValue(index, 'reverseAmount', e.target.value, true)}
												/>
												<div className={styles.unit}>VNĐ</div>
											</div>
										</div>

										<div>
											<p className={clsx(styles.label, styles.mt)}>Sử dụng vốn dự án</p>
											<div className={styles.input_specification}>
												<input
													name='value'
													type='text'
													placeholder='Nhập Sử dụng vốn dự án'
													className={styles.input}
													value={contract?.amountDisbursement}
													onChange={(e) => handleChangeValue(index, 'amountDisbursement', e.target.value, true)}
												/>
												<div className={styles.unit}>VNĐ</div>
											</div>
										</div>
										<div>
											<div className={styles.mt}>
												<DatePicker
													onClean={true}
													icon={true}
													label={<span>Ngày giải ngân</span>}
													placeholder='Chọn ngày giải ngân'
													value={contract?.dayDisbursement}
													onSetValue={(date) => handleChangeValue(index, 'dayDisbursement', date)}
													name='birthday'
												/>
											</div>
										</div>
									</div>
									<div>
										<label className={styles.label}>Mô tả</label>
										<textarea
											name='note'
											value={contract?.note}
											placeholder='Nhập mô tả'
											className={styles.textarea}
											onChange={(e) => handleChangeValue(index, 'note', e.target.value)}
										/>
									</div>
								</GridColumn>
							</div>
						</div>
					</>
				) : (
					<div className={styles.main}>
						<GridColumn col_4>
							<div className={styles.item}>
								<p>Số hợp đồng</p>
								<p>{contract?.code || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Tên công việc</p>
								<p>{contract?.activityDTO?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Tên nhà thầu</p>
								<p>{contract?.contractorInfos?.map((v) => v?.contractorName).join(', ')}</p>
							</div>
							<div className={styles.item}>
								<p>Trạng thái công việc</p>
								<StateActive
									stateActive={contract?.activityDTO?.state}
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
							</div>
						</GridColumn>
					</div>
				)}
			</div>
		</div>
	);
}

export default ContractItemCreate;
