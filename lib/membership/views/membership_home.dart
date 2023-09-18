import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:gym/common/component/dialog/action_action.dart';
import 'package:gym/common/component/dialog/action_content.dart';
import 'package:gym/common/component/dialog/action_dialog.dart';
import 'package:gym/common/component/dialog/single_content.dart';
import 'package:gym/common/component/dialog/single_dialog.dart';
import 'package:gym/common/component/main/home_top.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/membership/component/member_info_list.dart';
import 'package:gym/modal/member_detail.dart';
import 'package:gym/modal/member_info.dart';
import 'package:gym/modal/register_ticket.dart';
import 'dart:math' as math;

class MembershipHome extends StatelessWidget {
  const MembershipHome({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      color: WHITE_COLOR,
      child: Column(
        children: [
          HomeTop(
            title: 'Members',
            subTitle: '회원관리',
            searchFunc: () {},
            buttonName: "+회원등록",
            buttonFunc: () {
              ActionDialog(
                context,
                const ActionContent(
                  sizedBoxWidth: 770,
                  sizedBoxHeight: 480,
                  child: MemberInfo(),
                  // sizedBoxHeight: 745,
                  // child: RegisterTicket(),
                ),
                ActionAction(
                  prevFunc: () {
                    Navigator.of(context).pop();
                  },
                  nextFunc: () {
                    ActionDialog(
                      context,
                      const ActionContent(
                        sizedBoxWidth: 770,
                        sizedBoxHeight: 745,
                        child: RegisterTicket(),
                      ),
                      ActionAction(
                        prevFunc: () {
                          Navigator.of(context).pop();
                        },
                        nextFunc: () {
                          Navigator.of(context).pop();
                        },
                      ),
                    );
                  },
                ),
              );
            },
          ),
          Expanded(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      children: [
                        const Row(
                          children: [
                            _TableColumnTitle(
                              name: '이름',
                            ),
                            _TableColumnTitle(
                              name: '연락처',
                            ),
                            _TableColumnTitle(
                              name: '시작일',
                            ),
                            _TableColumnTitle(
                              name: '종료일',
                            ),
                            _TableColumnTitle(
                              name: '잔여일',
                            ),
                            _TableColumnTitle(
                              name: 'Status',
                            ),
                          ],
                        ),
                        const Divider(
                          color: GREY_500_COLOR,
                          thickness: 1,
                        ),
                        MemberInfoList(
                          name: '김아무개',
                          phoneNum: '010-1234-1234',
                          startDate: '2022.12.12',
                          endDate: '2023.12.12',
                          remainDay: 94,
                          status: 'Status',
                          clickRow: () {
                            SingleDialog(
                              context,
                              const SingleContent(
                                sizedBoxWidth: 636,
                                sizedBoxHeight: 651,
                                child: MemberDetail(),
                              ),
                            );
                          },
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _TableColumnTitle extends StatelessWidget {
  final String name;
  final bool sort = false;

  const _TableColumnTitle({
    required this.name,
  });

  double transFrom(sort) {
    double degrees = 0;
    if (sort) {
      degrees = 180;
    }
    double radius = degrees * math.pi / 180;

    return radius;
  }

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: InkWell(
        onTap: () {},
        child: Center(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                name,
                style: const TextStyle(
                  color: GREY_500_COLOR,
                ),
              ),
              SizedBox(
                child: Transform.rotate(
                  angle: transFrom(sort),
                  child: SvgPicture.asset(
                    'asset/svg/icon/select.svg',
                    width: 22,
                    height: 22,
                    color: GREY_400_COLOR,
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
