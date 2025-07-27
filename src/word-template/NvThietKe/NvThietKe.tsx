import {Document, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, VerticalAlign} from 'docx';
import moment from 'moment';

export const NvThietKe = (): Document => {
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
														size: 26,
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
								text: 'NHIỆM VỤ THIẾT KẾ',
								bold: true,
								size: 28,
							}),
						],
					}),

					new Paragraph({
						alignment: AlignmentType.CENTER,
						spacing: {
							before: 160,
						},
						children: [
							new TextRun({
								text: '(tên công trình)',
								bold: true,
								size: 24,
								underline: {},
							}),
						],
					}),

					new Paragraph({
						spacing: {
							before: 200,
						},
						indent: {left: 720},
						children: [
							new TextRun({
								text: 'I. Căn cứ để lập nhiệm vụ thiết kế xây dựng',
								bold: true,
								size: 28,
							}),
						],
					}),
					// Các căn cứ pháp lý
					new Paragraph({
						indent: {left: 720}, // thụt lề đầu dòng
						children: [
							new TextRun({
								text: '-  Căn cứ Luật Xây dựng số 50/2014/QH13 ngày 18/6/2014, Luật số 62/2020/QH14 ngày',
								size: 26,
							}),
							new TextRun({
								text: ' 17/6/2020 của Quốc hội nước Cộng hoà xã hội chủ nghĩa Việt Nam sửa đổi một số điều của ',
								size: 26,
							}),
							new TextRun({
								text: ' Luật Xây dựng;',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '-  Căn cứ Nghị định số 15/2021/NĐ-CP ngày 3/3/2021 của Chính phủ quy định chi tiết một số nội dung về quản lý dự án đầu tư xây dựng;',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '-  Căn cứ Quy định về Quản lý hoạt động đầu tư xây dựng công trình ban hành kèm theo Quyết định số 108/CS-HĐQT-NHCT-MSTS2 ngày 21/03/2023 của HĐQT VietinBank;',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '-  Căn cứ kế hoạch đầu tư xây dựng công trình được thông báo.',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '-  Thiết kế kiến trúc sơ bộ công trình được phê duyệt kèm theo Quyết định số ___/… ngày … của…',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '-  Căn cứ pháp lý khác',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: 'II. Nội dung nhiệm vụ thiết kế xây dựng',
								bold: true,
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: 'III.Các yêu cầu về quy hoạch, cảnh quan và kiến trúc của công trình',
								bold: true,
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '1. Vị trí và đặc điểm khu đất xây dựng:',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '-  vị trí: ...',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '-  Phạm vi danh giới:',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '+ Phía bắc giáp: ...',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '+ Phía nam giáp: ...',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '+ Phía đông giáp: ...',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '+ Phía tây giáp: ...',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '-  Đặc điểm khu đất: ...',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '2.Các yêu cầu về quy hoạch, cảnh quan và kiến trúc đối với khu vực xây dựng công trình:',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: 'a.Yêu cầu về quy hoạch: :',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: 'Mô tả theo thông tin quy hoạch hoặc quy hoạch chi tiết',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: 'b.Yêu cầu về kiến trúc:',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: 'Mô tả theo thiết kế kiến trúc sơ bộ công trình được phê duyệt',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: 'IV.Quy mô và công năng của công trình',
								bold: true,
								size: 28,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '1.Quy mô công trình',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [new TextRun({text: '- Loại công trình:…', size: 26})],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [new TextRun({text: '- Quy mô về xây dựng', size: 26})],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [new TextRun({text: '+Diện tích xây dựng:', size: 26})],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [new TextRun({text: '+Diện tích sàn:', size: 26})],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [new TextRun({text: '+Số tầng: ', size: 26})],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [new TextRun({text: '- Diện tích khu đất xây dựng:..', size: 26})],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [new TextRun({text: '- TMĐT dự kiến:...', size: 26})],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [new TextRun({text: '- Các yêu cầu về công năng sử dụng của công trình', size: 26})],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [new TextRun({text: '- Thời hạn sử dụng công trình', size: 26})],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '2.Yêu cầu về trang thiết bị',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [new TextRun({text: '- Giải pháp về cung cấp điện nước, nước thải:', size: 26})],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [new TextRun({text: '- Giải pháp về thông tin liên lạc, công nghệ thông tin', size: 26})],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [new TextRun({text: '- Giải pháp đảm bảo an ninh; Đảm bảo an toàn về phòng chống cháy nổ;', size: 26})],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [new TextRun({text: '- Phương án dây chuyền công nghệ (nếu có);', size: 26})],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '3.Các yêu cầu về vật liệu hoàn thiện:',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '4.Các yêu cầu khác (nếu có)',
								size: 26,
							}),
						],
					}),
					new Paragraph({
						indent: {left: 720},
						children: [
							new TextRun({
								text: '5.Thời hạn hoàn thành hồ sơ thiết kế: …',
								size: 26,
							}),
						],
					}),
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
												spacing: {
													before: 300,
													after: 50,
												},
												alignment: AlignmentType.CENTER,
												children: [new TextRun({text: 'ĐƠN VỊ LẬP', size: 28, bold: true})],
											}),
											new Paragraph({
												spacing: {
													before: 300,
													after: 50,
												},
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({text: '  (ký, ghi rõ họ tên, chức danh )', size: 24, italics: true}),
												],
											}),
										],
									}),
									new TableCell({
										children: [
											new Paragraph({
												spacing: {
													before: 300,
													after: 50,
												},
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: 'ĐẠI DIỆN CHỦ ĐẦU TƯ',
														size: 28,
														bold: true,
													}),
												],
											}),
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '(Theo phân cấp)',
														size: 26,
														bold: true,
													}),
												],
											}),
											new Paragraph({
												spacing: {
													before: 300,
													after: 50,
												},
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '(ký, ghi rõ họ tên, chức danh và đóng dấu)',
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
