import 'package:flutter/material.dart';
import 'package:gym/common/component/dialog/action_action.dart';
import 'package:gym/common/component/dialog/action_content.dart';
import 'package:gym/common/component/dialog/action_dialog.dart';
import 'package:gym/common/component/main/home_top.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/helth/component/helth_card.dart';
import 'package:gym/helth/modal/add_helth.dart';

class HelthHome extends StatelessWidget {
  const HelthHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: WHITE_COLOR,
      child: Column(
        children: [
          HomeTop(
            title: 'Membership',
            subTitle: '회원권 관리',
            searchFunc: () {},
            buttonName: "+상품등록",
            buttonFunc: () {
              ActionDialog(
                context,
                const ActionContent(
                  sizedBoxWidth: 340,
                  sizedBoxHeight: 500,
                  child: AddHelth(),
                ),
                ActionAction(
                  nextFunc: () {},
                ),
              );
            },
          ),
          const Expanded(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '헬스',
                        style: TextStyle(
                          color: GREY_900_COLOR,
                          fontSize: 20,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      SizedBox(
                        height: 16,
                      ),
                      Row(
                        children: [
                          HelthCard(
                            title: '헬스 12개월',
                            discountPer: 30,
                            cost: 600000,
                            note: '1개월 345,000원',
                          ),
                          SizedBox(
                            width: 16,
                          ),
                          HelthCard(
                            title: '헬스 12개월',
                            cost: 600000,
                          ),
                          SizedBox(
                            width: 16,
                          ),
                          HelthCard(
                            title: '헬스 12개월',
                            discountPer: 30,
                            cost: 600000,
                            note: '1개월 345,000원',
                          ),
                          SizedBox(
                            width: 16,
                          ),
                          HelthCard(
                            title: '헬스 1개월',
                            cost: 70000,
                            note: '1개월 70,000원',
                          ),
                        ],
                      ),
                    ],
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
