import 'package:flutter/material.dart';
import 'package:gym/common/component/dialog/action_action.dart';
import 'package:gym/common/component/dialog/action_content.dart';
import 'package:gym/common/component/dialog/action_dialog.dart';
import 'package:gym/common/component/dialog/single_content.dart';
import 'package:gym/common/component/main/home_top.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/employee/component/employee_add_card.dart';
import 'package:gym/employee/component/employee_card.dart';
import 'package:gym/employee/component/employee_setting_bar.dart';
import 'package:gym/employee/modal/member_list.dart';

class EmployeeHome extends StatelessWidget {
  const EmployeeHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: WHITE_COLOR,
      child: Column(
        children: [
          HomeTop(
            title: 'Employee',
            subTitle: '직원관리',
            searchFunc: () {},
          ),
          Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              children: [
                const EmployeeSettingBar(),
                Padding(
                  padding: const EdgeInsets.only(top: 16.0),
                  child: SizedBox(
                    width: double.infinity,
                    child: Wrap(
                      alignment: WrapAlignment.start,
                      spacing: 8, // 상하(좌우)
                      runSpacing: 8,
                      children: [
                        EmployeeAddCard(
                          createEmployeeFunc: () {
                            ActionDialog(
                              context,
                              const ActionContent(
                                sizedBoxWidth: 656,
                                sizedBoxHeight: 577,
                                child: MemberList(),
                              ),
                              ActionAction(
                                nextFunc: () {},
                              ),
                            );
                            // ActionDialog(
                            //   context,
                            //   const ActionContent(
                            //     sizedBoxWidth: 560,
                            //     sizedBoxHeight: 554,
                            //     child: EmployeeInfo(),
                            //   ),
                            //   ActionAction(
                            //     nextFunc: () {},
                            //   ),
                            // );
                          },
                        ),
                        const EmployeeCard(
                          name: '박땡땡',
                          startDate: '2022.12.06',
                          phoneNum: '010-2755-7138',
                          working: true,
                        ),
                        const EmployeeCard(
                          name: '박땡땡',
                          startDate: '2022.12.06',
                          phoneNum: '010-2755-7138',
                          working: false,
                        ),
                      ],
                    ),
                  ),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
