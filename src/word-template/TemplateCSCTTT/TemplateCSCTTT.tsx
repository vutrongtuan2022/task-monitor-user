import {Document, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType} from 'docx';
import moment from 'moment';
import {ICSCT} from '~/components/pages/csct/MainPageCSCT/interfaces';

export const generateCSCTDocx = (csct: ICSCT) => {
	const today = new Date();

	return new Document({
		styles: {
			default: {
				document: {
					run: {
						font: 'Times New Roman',
						size: 26,
					},
				},
			},
		},
		sections: [
			{
				properties: {},
				children: [
					new Table({
						width: {size: 108, type: WidthType.PERCENTAGE},
						borders: {
							top: {style: 'none', size: 0, color: 'FFFFFF'},
							bottom: {style: 'none', size: 0, color: 'FFFFFF'},
							left: {style: 'none', size: 0, color: 'FFFFFF'},
							right: {style: 'none', size: 0, color: 'FFFFFF'},
							insideHorizontal: {style: 'none', size: 0, color: 'FFFFFF'},
							insideVertical: {style: 'none', size: 0, color: 'FFFFFF'},
						},
						rows: [
							new TableRow({
								children: [
									new TableCell({
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun({text: 'NGÂN HÀNG TMCP CÔNG THƯƠNG', size: 24, bold: true})],
											}),
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun({text: 'VIỆT NAM', size: 24, bold: true, underline: {}})],
											}),
											new Paragraph({
												alignment: AlignmentType.CENTER,
												spacing: {before: 160},
												children: [
													new TextRun({text: 'Số: ', size: 24}),
													new TextRun({text: '24./TV-XDCB-2024', size: 24, italics: true}),
												],
											}),
										],
									}),
									new TableCell({
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: 'CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM',
														size: 24,
														bold: true,
													}),
												],
											}),
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: 'Độc lập - Tự do - Hạnh phúc',
														size: 24,
														bold: true,
														underline: {},
													}),
												],
											}),
											new Paragraph({
												alignment: AlignmentType.CENTER,
												spacing: {before: 160},
												children: [
													new TextRun({text: 'Hà Nội, ngày ', size: 24, italics: true}),
													new TextRun({text: moment(today).format('DD'), size: 24, italics: true}),
													new TextRun({text: ' tháng ', italics: true}),
													new TextRun({text: moment(today).format('MM'), size: 24, italics: true}),
													new TextRun({text: ' năm ', italics: true}),
													new TextRun({text: moment(today).format('YYYY'), size: 24, italics: true}),
												],
											}),
										],
									}),
								],
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.CENTER,
						spacing: {
							before: 400,
							after: 50,
						},
						children: [
							new TextRun({
								text: 'THÔNG BÁO',
								bold: true,
								size: 28,
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.CENTER,
						spacing: {after: 50},
						children: [
							new TextRun({
								text: 'V/v Chấp thuận Thanh toán phí thẩm duyệt PCCC công trình',
								bold: true,
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.CENTER,
						spacing: {after: 300},
						children: [
							new TextRun({
								text: 'Nâng cấp, cải tạo khối nhà 05 tầng tại TSCN Bình Xuyên',
								bold: true,
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 600},
						children: [
							new TextRun({
								text: 'Căn cứ Quy định về quản lý dự án đầu tư xây dựng công trình ban hành kèm theo Quyết định số 108/CS-HĐQT-NHCT-MSTS2 ngày 21/03/2023 của Hội đồng quản trị Ngân hàng TMCP Công thương Việt Nam;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 600},
						children: [
							new TextRun({
								text: 'Căn cứ thông báo số 323/TB-TGĐ-NHCT-MSTS2 ngày 02/01/2024 của Tổng Giám đốc Ngân hàng TMCP Công thương Việt Nam về kế hoạch đầu tư xây dựng công trình năm 2024;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 600},
						children: [
							new TextRun({
								text: 'Căn cứ văn bản số 53/TD-PCCC&CNCH ngày 23/02/2024 của Phòng Cảnh sát PCCC và CNCH – Công an tỉnh Vĩnh Phúc về đồng ý về thiết kế PC&CC công trình Nâng cấp, cải tạo khối nhà 5 tầng tại TSCN Bình Xuyên;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 600},
						children: [
							new TextRun({
								text: 'Căn cứ Thông báo số 53/PCCC-CTPC ngày 23/02/2024 của Phòng Cảnh sát PCCC và CNCH – Công an tỉnh Vĩnh Phúc về thông báo nộp phí thẩm định phê duyệt thiết kế về PCCC công trình Nâng cấp, cải tạo khối nhà 5 tầng tại TSCN Bình Xuyên;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 600},
						children: [
							new TextRun({
								text: 'Căn cứ Tờ trình đề nghị duyệt thanh toán số 88/TTr-CNBX-TCHC ngày 27/02/2024 của Chi nhánh Bình Xuyên;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 600},
						children: [
							new TextRun({
								text: 'Sau khi xem xét Tờ trình đề nghị chấp thuận thanh toán của Phòng QL ĐTXDCB và Phòng KTTC, Chủ đầu tư chấp thuận thanh toán cho nhà thầu như sau:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						spacing: {before: 100},
						indent: {firstLine: 720},
						children: [
							new TextRun({
								text: '1. Tên công trình, dự án: ',
							}),
							new TextRun({
								text: 'Nâng cấp, cải tạo khối nhà 5 tầng tại TSCN Bình Xuyên',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						spacing: {before: 100},
						indent: {firstLine: 720},
						children: [
							new TextRun({
								text: '2. Nội dung: ',
							}),
							new TextRun({
								text: 'Phí thẩm định phê duyệt thiết kế về PCCC.',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 720},
						spacing: {before: 100},
						children: [
							new TextRun({
								text: '3. Giá trị chấp thuận thanh toán: ',
							}),
							new TextRun({
								text: '831.000 đồng.',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.CENTER,
						spacing: {before: 100},
						children: [
							new TextRun({
								text: '(Bằng chữ: ',
								italics: true,
								size: 24,
							}),
							new TextRun({
								text: 'Tám trăm ba mươi mốt nghìn đồng',
								italics: true,
								size: 24,
							}),
							new TextRun({
								text: ')',
								italics: true,
								size: 24,
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 720},
						spacing: {before: 100},
						children: [
							new TextRun({
								text: '4. Nội dung thanh toán: ',
							}),
							new TextRun({
								text: 'Thanh toán phí thẩm định phê duyệt thiết kế về PCCC công trình Nâng cấp, cải tạo khối nhà 5 tầng tại TSCN Bình Xuyên theo Thông báo số 53/PCCC-CTPC ngày 23/02/2024 của Phòng Cảnh sát PCCC và CNCH – Công an tỉnh Vĩnh Phúc.',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 720},
						spacing: {before: 100},
						children: [
							new TextRun({
								text: '5. Nguồn vốn: ',
							}),
							new TextRun({
								text: 'Vốn đầu tư, mua sắm TSCĐ của Ngân hàng TMCP Công thương Việt Nam.',
							}),
						],
					}),

					new Paragraph({
						alignment: AlignmentType.LEFT,
						spacing: {before: 200},
						children: [
							new TextRun({
								text: 'Trân trọng./.',
							}),
						],
					}),

					// new Paragraph({
					// 	spacing: {after: 100},
					// 	alignment: AlignmentType.LEFT,
					// 	children: [
					// 		new TextRun({
					// 			text: 'Nơi nhận:',
					// 			bold: true,
					// 			italics: true,
					// 		}),
					// 	],
					// }),
					// new Paragraph({
					// 	alignment: AlignmentType.LEFT,
					// 	children: [
					// 		new TextRun({
					// 			text: '- Như đề gửi;',
					// 		}),
					// 	],
					// }),
					// new Paragraph({
					// 	alignment: AlignmentType.LEFT,
					// 	children: [
					// 		new TextRun({
					// 			text: '- TC4;',
					// 		}),
					// 	],
					// }),
					// new Paragraph({
					// 	alignment: AlignmentType.LEFT,
					// 	children: [
					// 		new TextRun({
					// 			text: '- Lưu VP, MSTS2(1).',
					// 		}),
					// 	],
					// }),

					// new Paragraph({
					// 	alignment: AlignmentType.RIGHT,
					// 	children: [
					// 		new TextRun({
					// 			text: 'CHỦ ĐẦU TƯ\nGIÁM ĐỐC KHỐI MS&QLTS',
					// 			bold: true,
					// 		}),
					// 	],
					// }),
					// new Paragraph({
					// 	alignment: AlignmentType.RIGHT,
					// 	children: [
					// 		new TextRun({
					// 			text: '(Đã ký)',
					// 			italics: true,
					// 		}),
					// 	],
					// }),
					// new Paragraph({
					// 	alignment: AlignmentType.RIGHT,
					// 	children: [
					// 		new TextRun({
					// 			text: 'Nguyễn Thành Xuân',
					// 			bold: true,
					// 		}),
					// 	],
					// }),
				],
			},
		],
	});
};
