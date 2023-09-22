import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:gym/common/component/dialog/single_content.dart';
import 'package:gym/common/component/dialog/single_dialog.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/helth/component/helth_card.dart';
import 'package:gym/membership/component/use/member_info_card.dart';
import 'package:gym/membership/component/use/use_content_info.dart';
import 'package:gym/modal/ticket_history.dart';

class MemberDetail extends StatelessWidget {
  const MemberDetail({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: 536,
          height: 154,
          padding: const EdgeInsets.fromLTRB(12, 12, 12, 12),
          decoration: ShapeDecoration(
            color: GREY_900_COLOR,
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
          ),
          child: Column(
            children: [
              SizedBox(
                width: double.infinity,
                height: 15,
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.end,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    SizedBox(
                      width: 14,
                      height: 14,
                      child: SvgPicture.asset(
                        'asset/svg/icon/edit.svg',
                        fit: BoxFit.scaleDown,
                      ),
                    ),
                    const SizedBox(width: 2),
                    const Text(
                      'Edit',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Color(0xFF757575),
                        fontSize: 12,
                        fontFamily: 'Outfit',
                        fontWeight: FontWeight.w400,
                        height: 0,
                      ),
                    ),
                  ],
                ),
              ),
              const MemberInfoCard(),
            ],
          ),
        ),
        const SizedBox(height: 30),
        SizedBox(
          width: 536,
          height: 32,
          child: Row(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Text(
                '이용 상품',
                style: TextStyle(
                  color: GREY_900_COLOR,
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                  height: 0,
                ),
              ),
              // const SizedBox(width: 159),
              Container(
                width: 100,
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: ShapeDecoration(
                  color: PRIMARY_COLOR,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(4)),
                ),
                child: const Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      '+ 회원권 추가',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: WHITE_COLOR,
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                        height: 0,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        const SizedBox(
          width: 536,
          height: 268,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              UseContent(),
              VerticalDivider(),
              UseContent(),
            ],
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            InkWell(
              onTap: () {
                SingleDialog(
                  context,
                  const SingleContent(
                    sizedBoxWidth: 856,
                    sizedBoxHeight: 650,
                    child: TicketHistory(),
                  ),
                );
              },
              child: Container(
                decoration: const BoxDecoration(
                  border: Border(bottom: BorderSide(width: 1.0)),
                ),
                child: const Text(
                  '+ 회원권등록이력',
                  style: TextStyle(
                    color: GREY_600_COLOR,
                    fontSize: 10,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class UseContent extends StatelessWidget {
  const UseContent({super.key});

  @override
  Widget build(BuildContext context) {
    return const SizedBox(
      width: double.infinity,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // UseContentCard(),
          HelthCard(
            title: "헬스 12개월",
            cost: 600000,
            discountPer: 30,
            note: "1개월 50,000원",
            width: 250,
            height: 130,
            button: true,
          ),
          UseContentInfo(),
        ],
      ),
    );
  }
}
