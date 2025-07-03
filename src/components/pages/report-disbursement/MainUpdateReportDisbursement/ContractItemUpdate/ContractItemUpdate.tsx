import React, {useState} from 'react';
import styles from './ContractItemUpdate.module.scss';
import {PropsContractItemUpdate} from './interfaces';
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

function ContractItemUpdate({index, contract, handleChangeValue, handleDelete, handleDeletePn}: PropsContractItemUpdate) {
	const [collapsed, setCollapsed] = useState(false);

	const handleToggle = () => {
		setCollapsed(!collapsed);
	};

	return (
		<div className={styles.container}>
			<div className={styles.basic_info}>
				<div className={styles.head}>
					<h4>Thông tin hợp đồng</h4>
					<div className={styles.group_button}>
						<div className={styles.delete} onClick={handleDelete}>
							<Trash size={22} color='#EE464C' />
						</div>
						<p className={styles.toggle_btn} onClick={handleToggle}>
							{collapsed ? 'Xem chi tiết ▼ ' : 'Thu gọn ▲ '}
						</p>
					</div>
				</div>
				{collapsed == false ? (
					<div>
						<div className={styles.main}>
							<GridColumn col_4>
								<div className={styles.item}>
									<p>Số hợp đồng</p>
									<p>{contract?.detailContractsDTO?.code || '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Tên công việc</p>
									<p>{contract?.detailContractsDTO?.activityDTO?.name || '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Tên nhà thầu</p>
									<p>{contract?.detailContractsDTO?.contractorInfos?.map((v) => v?.contractorName).join(', ')}</p>
								</div>
								<div className={styles.item}>
									<p>Trạng thái công việc</p>
									<StateActive
										stateActive={contract?.detailContractsDTO?.activityDTO?.state}
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
									<p>{contract?.detailContractsDTO?.contractorInfos?.map((v) => v?.contractorCatName).join(', ')}</p>
								</div>
								<div className={styles.item}>
									<p>Lũy kế giải ngân hiện tại</p>
									<p>
										<span style={{color: '#EE464C'}}>{convertCoin(contract?.detailContractsDTO?.accumAmount)}</span> /{' '}
										<span>{convertCoin(contract?.detailContractsDTO?.amount)}</span>
									</p>
								</div>
								<div className={styles.item}>
									<p>Lũy kế giải ngân trong năm</p>
									<p>{convertCoin(contract?.detailContractsDTO?.accumAmountThisYear) || '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Tiến độ giải ngân</p>
									<Progress percent={contract?.detailContractsDTO?.progress} width={80} />
								</div>

								<div className={styles.item}>
									<p>Ngày ký hợp đồng</p>
									<p>
										{contract?.detailContractsDTO?.startDate ? (
											<Moment date={contract?.detailContractsDTO?.startDate} format='DD/MM/YYYY' />
										) : (
											'---'
										)}
									</p>
								</div>
								<div className={styles.item}>
									<p>Giá trị hợp đồng</p>
									<p>{convertCoin(contract?.detailContractsDTO?.amount) || '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Thời gian THHĐ (ngày)</p>
									<p>{contract?.detailContractsDTO?.totalDayAdvantage || '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Giá trị BLTHHĐ</p>
									<p>{convertCoin(contract?.detailContractsDTO?.contractExecution?.amount) || '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Ngày kết thúc BLTHHĐ</p>
									<p>
										{contract?.detailContractsDTO?.contractExecution?.endDate ? (
											<Moment date={contract?.detailContractsDTO?.contractExecution?.endDate} format='DD/MM/YYYY' />
										) : (
											'---'
										)}
									</p>
								</div>
								<div className={styles.item}>
									<p>Giá trị BLTƯ</p>
									<p>{convertCoin(contract?.detailContractsDTO?.advanceGuarantee?.amount) || '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Ngày kết thúc BLTƯ</p>
									<p>
										{contract?.detailContractsDTO?.advanceGuarantee?.endDate ? (
											<Moment date={contract?.detailContractsDTO?.advanceGuarantee?.endDate} format='DD/MM/YYYY' />
										) : (
											'---'
										)}
									</p>
								</div>
							</GridColumn>
						</div>

						<div className={styles.head}>
							<h4>Thông tin giải ngân kỳ này</h4>
						</div>
						{contract?.pnContract?.map((v, idx) => (
							<div className={styles.main} key={idx}>
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
												value={v?.pn?.code}
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
												value={v?.contractor?.contractor?.name || ''}
											/>
											<div className={styles.delete} onClick={() => handleDeletePn(index, idx)}>
												<Trash size={22} color='#EE464C' />
											</div>
										</div>
									</div>
									<div>
										<p className={styles.label}>Sử dụng vốn dự án</p>
										<div className={styles.input_specification}>
											<input
												name='value'
												type='text'
												placeholder='Nhập vốn dự án'
												className={styles.input}
												value={convertCoin(v?.guaranteeAmount)}
												onChange={(e) => handleChangeValue(index, 'guaranteeAmount', e.target.value, true, idx)}
											/>
											<div className={styles.unit}>VNĐ</div>
										</div>
										<p className={clsx(styles.label, styles.mt)}>Sử dụng vốn dự phòng</p>
										<div className={styles.input_specification}>
											<input
												name='value'
												type='text'
												placeholder='Nhập vốn dự phòng'
												className={styles.input}
												value={convertCoin(v?.guaranteeReverseAmount)}
												onChange={(e) =>
													handleChangeValue(index, 'guaranteeReverseAmount', e.target.value, true, idx)
												}
											/>
											<div className={styles.unit}>VNĐ</div>
										</div>

										<div className={styles.mt}>
											<DatePicker
												onClean={true}
												icon={true}
												label={<span>Ngày giải ngân</span>}
												placeholder='Chọn ngày giải ngân'
												value={v?.releaseDate}
												onSetValue={(date) => handleChangeValue(index, 'releaseDate', date, false, idx)}
												name='birthday'
											/>
										</div>
									</div>
									<div>
										<label className={styles.label}>Mô tả</label>
										<textarea
											name='note'
											value={v?.note}
											placeholder='Nhập mô tả'
											className={styles.textarea}
											onChange={(e) => handleChangeValue(index, 'note', e.target.value, false, idx)}
										/>
									</div>
								</GridColumn>
							</div>
						))}

						{/* ))} */}
					</div>
				) : (
					<div className={styles.main}>
						<GridColumn col_4>
							<div className={styles.item}>
								<p>Số hợp đồng</p>
								<p>{contract?.detailContractsDTO?.code || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Tên công việc</p>
								<p>{contract?.detailContractsDTO?.activityDTO?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Tên nhà thầu</p>
								<p>{contract?.detailContractsDTO?.contractorInfos?.map((v) => v?.contractorName).join(', ')}</p>
							</div>
							<div className={styles.item}>
								<p>Trạng thái công việc</p>
								<StateActive
									stateActive={contract?.detailContractsDTO?.activityDTO?.state}
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

export default ContractItemUpdate;
