import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/common/component/dialog/action_action.dart';
import 'package:gym/common/component/dialog/action_content.dart';
import 'package:gym/common/component/dialog/action_dialog.dart';
import 'package:gym/common/component/main/home_top.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/employee/component/employee_add_card.dart';
import 'package:gym/employee/component/employee_card.dart';
import 'package:gym/employee/component/employee_setting_bar.dart';
import 'package:gym/employee/modal/member_list.dart';
import 'package:gym/params/user_params.dart';
import 'package:gym/provider/user_provider.dart';
import 'package:gym/repository/user_repository.dart';
import 'package:gym/util/util.dart';

class EmployeeHome extends ConsumerStatefulWidget {
  const EmployeeHome({super.key});

  @override
  ConsumerState<EmployeeHome> createState() => _EmployeeHomeState();
}

class _EmployeeHomeState extends ConsumerState<EmployeeHome> {
  String employeeName = '';

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(userProvider);

    return Container(
      color: WHITE_COLOR,
      child: Column(
        children: [
          HomeTop(
            title: 'Employee',
            subTitle: '직원관리',
            onChanged: (String value) {
              employeeName = value;
            },
            searchFunc: () {
              ref
                  .read(userProvider.notifier)
                  .getUser(UserParams(name: employeeName));
            },
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
                        for (int i = 0; i < state.length; i++)
                          EmployeeCard(
                            name: state[i].name,
                            startDate: yearMonthDay(state[i].startday),
                            phoneNum: phonenumberUnit(state[i].phonenum),
                            working: true,
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
