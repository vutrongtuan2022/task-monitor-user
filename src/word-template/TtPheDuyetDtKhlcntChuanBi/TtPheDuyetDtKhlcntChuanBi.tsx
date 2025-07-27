import {Document, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, VerticalAlign} from 'docx';
import moment from 'moment';

export const TtPheDuyetDtKhlcntChuanBi = (): Document => {
	const today = new Date();

	return new Document({
		styles: {
			default: {document: {run: {font: 'Times New Roman', size: 26}}},
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
													new TextRun({
														text: `---`,
														size: 24,
													}),
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
							before: 300,
							after: 50,
						},
						children: [
							new TextRun({
								text: 'TỜ TRÌNH',
								bold: true,
								size: 28,
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.CENTER,
						// spacing: {before: 100},
						children: [
							new TextRun({
								text: `V/v đề nghị phê duyệt dự toán, kế hoạch lựa chọn nhà thầu các gói thầu giai đoạn chuẩn bị đầu tư công trình …`,
								bold: true,
								size: 24,
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.CENTER,
						spacing: {after: 100},
						children: [
							new TextRun({
								text: `Kính trình: Chủ đầu tư`,
								bold: true,
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Căn cứ Luật Đấu thầu số 43/2013/QH13 ngày 26/11/2013 của Quốc hội nước Cộng hòa xã hội chủ nghĩa Việt Nam;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						spacing: {before: 100},
						children: [
							new TextRun({
								text: 'Căn cứ Luật Xây dựng số 50/2014/QH13 ngày 18/6/2014, Luật số 62/2020/QH14 ngày 17/6/2020 của Quốc hội nước Cộng hòa xã hội chủ nghĩa Việt Nam sửa đổi một số điều của Luật Xây dựng;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						spacing: {before: 100},
						children: [
							new TextRun({
								text: 'Căn cứ Nghị định số 63/2014/NĐ-CP ngày 26/6/2014 của Chính phủ hướng dẫn thi hành Luật Đấu thầu và lựa chọn nhà thầu;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						spacing: {before: 100},
						children: [
							new TextRun({
								text: 'Căn cứ Nghị định số 10/2021/NĐ-CP ngày 9/2/2021 của Chính phủ về quản lý chi phí đầu tư xây dựng;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						spacing: {before: 100},
						children: [
							new TextRun({
								text: 'Căn cứ Nghị định số 15/2021/NĐ-CP ngày 3/3/2021 của Chính phủ quy định chi tiết một số nội dung về quản lý dự án đầu tư xây dựng;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						spacing: {before: 100},
						children: [
							new TextRun({
								text: 'Căn cứ Quy định về Quản lý hoạt động đầu tư xây dựng công trình ban hành kèm theo Quyết định số 108/CS-HĐQT-NHCT-MSTS2 ngày 21/03/2023 của HĐQT VietinBank;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						spacing: {before: 100},
						children: [
							new TextRun({
								text: 'Căn cứ (pháp lý khác có liên quan),',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						spacing: {before: 100},
						children: [
							new TextRun({
								text: 'Phòng đầu mối......... kính trình Chủ đầu tư về việc phê duyệt dự toán, kế hoạch lựa chọn nhà thầu các gói thầu giai đoạn chuẩn bị đầu tư công trình ……như sau:',
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'A.Tóm tắt về dự án',
								bold: true,
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '1.Tên công trình',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '2.Nguồn vốn đầu tư',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '3.Chủ đâu tư',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '4.Địa điểm xây dựng',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '5.Nội dung và quy mô đầu tư',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '-Diện tích đất: ',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '-Diện tích xây dựng: ',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '-Tổng diện tích sàn xây dựng: ',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '-Số tầng: ',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '-Loại công trình: ',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '-Cấp công trình: ',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '-TMĐT dự kiến:  ',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '6.Thời gian dự kiến thực hiện:',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'B.Trình phê duyệt dự toán các gói thầu giai đoạn chuẩn bị đầu tư:',
								size: 28,
								bold: true,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						spacing: {before: 100},
						children: [
							new TextRun({
								text: 'Dự toán gói thầu 1:… đ, ',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Cơ sở tính toán……',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Dự toán gói thầu 2:… đ, ',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Cơ sở tính toán……',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Dự toán gói thầu thứ n:… đ, ',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Cơ sở tính toán…… ',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'C.Trình phê duyệt kế hoạch LCNT cho các gói thầu:',
								size: 28,
								bold: true,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'I.Phần công việc đã thực hiện: ',
								size: 28,
								bold: true,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						spacing: {before: 100},
						children: [
							new TextRun({
								text: '- Thống kê các công việc đã thực hiện, tổng giá trị, văn bản phê duyệt',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'II.Phần giá trị không áp dụng được một trong các hình thức LCNT',
								size: 28,
								bold: true,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						spacing: {before: 100},
						children: [
							new TextRun({
								text: '- Thống kê các công việc không áp dụng, tổng giá trị (nếu có) ',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'III.Kế hoạch lựa chọn nhà thầu:',
								size: 28,
								bold: true,
							}),
						],
					}),
					// new Paragraph({
					// 	indent: {firstLine: 400},
					// 	spacing: {before: 100},
					// 	children: [
					// 		new TextRun({
					// 			text: '1.Tổng hợp các công việc thuộc KHLCNT ',
					// 			size: 28,
					// 		}),
					// 	],
					// }),
					new Paragraph({
						// alignment: AlignmentType.JUSTIFIED,
						spacing: {before: 100, after: 100},
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '1.Tổng hợp các công việc thuộc KHLCNT',
							}),
						],
					}),
					new Table({
						width: {
							size: 100,
							type: WidthType.PERCENTAGE,
						},
						borders: {
							top: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
							bottom: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
							left: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
							right: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
							insideHorizontal: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
							insideVertical: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
						},
						rows: [
							new TableRow({
								children: [
									new TableCell({
										width: {size: 8, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('STT')],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Tên gói thầu`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Giá gói thầu`)],
											}),
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`(đồng)`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Nguồn vốn`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Hình thức  lựa chọn nhà thầu`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Phương thức LCNT`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Thời gian bắt đầu LCNT`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Loại hợp đồng`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Thời gian thực hiện HĐ`)],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										width: {size: 8, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('1')],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Gói thầu 1`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`0`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`0`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										width: {size: 8, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('2')],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Gói thầu 2`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`0`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`0`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										width: {size: 8, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('3')],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Gói thầu n`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`0`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`0`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										width: {size: 8, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('')],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Cộng`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`0`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`0`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
								],
							}),
						],
					}),
					new Paragraph({
						// alignment: AlignmentType.JUSTIFIED,

						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '2.Giải trình nội dung KHĐT',
							}),
						],
					}),
					new Paragraph({
						// alignment: AlignmentType.JUSTIFIED,

						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'a.Cơ sở phân chia gói thầu',
							}),
						],
					}),
					new Paragraph({
						// alignment: AlignmentType.JUSTIFIED,

						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Sự phù hợp phân chia gói thầu (Giải trình cụ thể)',
							}),
						],
					}),
					new Paragraph({
						// alignment: AlignmentType.JUSTIFIED,

						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'b.Giá gói thầu',
							}),
						],
					}),
					new Paragraph({
						// alignment: AlignmentType.JUSTIFIED,

						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Cơ sở tính giá gói thầu. (Giải trình cụ thể)',
							}),
						],
					}),
					new Paragraph({
						// alignment: AlignmentType.JUSTIFIED,

						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'c.Nguồn vốn: [ghi nguồn vốn], sự phù hợp với nguồn vốn dự án(Giải trình cụ thể)',
							}),
						],
					}),
					new Paragraph({
						// alignment: AlignmentType.JUSTIFIED,

						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'd.Hình thức lựa chọn nhà thầu ',
							}),
						],
					}),
					new Paragraph({
						// alignment: AlignmentType.JUSTIFIED,

						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Sự phù hợp với đặc điểm gói thầu, giá gói thầu, Luật đấu thầu và nghị định hướng dẫn. (Giải trình cụ thể)',
							}),
						],
					}),
					new Paragraph({
						// alignment: AlignmentType.JUSTIFIED,

						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'e.Loại hợp đồng',
							}),
						],
					}),
					new Paragraph({
						// alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Sự phù hợp của từng hợp đồng với Luật đấu thầu và nghị định hướng dẫn. (Giải trình cụ thể)',
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'IV.Phần công việc chưa đủ điều kiện lập KHLCNT: ',
								bold: true,
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '- Thống kê các công việc và giá trị chưa đủ điều kiện lập KHLCNT (nếu có)',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'V.Tổng giá trị các phần công việc:',
								bold: true,
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '- Thống kê tổng giá trị các phần công việc từ Mục II đến Mục V  ',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '(Đơn vị trình)......... kính trình Chủ đầu tư phê duyệt dự toán, kế hoạch lựa chọn nhà thầu các gói thầu giai đoạn chuẩn bị đầu tư công trình ……với các nội dung nêu trên.',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						spacing: {before: 100, after: 200},
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Kính trình./.',
							}),
						],
					}),
					new Table({
						width: {
							size: 100,
							type: WidthType.PERCENTAGE,
						},
						borders: {
							top: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
							bottom: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
							left: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
							right: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
							insideHorizontal: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
							insideVertical: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
						},
						rows: [
							new TableRow({
								children: [
									// Cột bên trái
									new TableCell({
										width: {size: 50, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.TOP,
										children: [
											new Paragraph({
												children: [new TextRun({text: ''})],
											}),
										],
									}),
									// Cột bên phải
									new TableCell({
										width: {size: 50, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.TOP,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun({text: 'PHÒNG ĐẦU MỐI', bold: true})],
											}),
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '(ký, ghi rõ họ tên, chức danh)',
														size: 24,
														italics: true,
													}),
												],
											}),
										],
									}),
								],
							}),
						],
					}),
				],
			},
		],
	});
};
