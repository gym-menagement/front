import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/svg.dart';
import 'package:gym/common/component/unit/round_button.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/params/user_params.dart';
import 'package:gym/provider/role_provider.dart';
import 'package:gym/provider/user_provider.dart';

class EmployeeSettingBar extends ConsumerStatefulWidget {
  const EmployeeSettingBar({super.key});

  @override
  ConsumerState<EmployeeSettingBar> createState() => _EmployeeSettingBarState();
}

class _EmployeeSettingBarState extends ConsumerState<EmployeeSettingBar> {
  int role = 0;

  @override
  void initState() {
    super.initState();
  }

  void tabRole(int num) {
    setState(() {
      role = num;
    });
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(roleProvider);

    return SizedBox(
      width: double.infinity,
      height: 28,
      child: Wrap(
        direction: Axis.vertical,
        alignment: WrapAlignment.center,
        runAlignment: WrapAlignment.spaceBetween,
        runSpacing: 32,
        children: [
          Row(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Row(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(
                    width: 16,
                    height: 16,
                    child: SvgPicture.asset(
                      'asset/svg/icon/sort.svg',
                    ),
                  ),
                  const SizedBox(width: 6),
                  const Text(
                    'Sort by',
                    style: TextStyle(
                      color: GREY_700_COLOR,
                      fontSize: 11,
                      fontFamily: 'Outfit',
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
              const SizedBox(width: 16),
              Row(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  RoundButton(
                    colors: role == 0 ? PRIMARY_COLOR : WHITE_COLOR,
                    textColor: role == 0 ? WHITE_COLOR : PRIMARY_COLOR,
                    borderColor: PRIMARY_COLOR,
                    name: 'ALL',
                    clickFunc: () {
                      ref
                          .read(userProvider.notifier)
                          .getUser(const UserParams());
                      tabRole(0);
                    },
                  ),
                  for (int i = 0; i < state.length; i++)
                    Padding(
                      padding: const EdgeInsets.only(left: 8.0),
                      child: RoundButton(
                        colors:
                            role == state[i].role ? PRIMARY_COLOR : WHITE_COLOR,
                        textColor:
                            role == state[i].role ? WHITE_COLOR : PRIMARY_COLOR,
                        borderColor: PRIMARY_COLOR,
                        name: state[i].name,
                        clickFunc: () {
                          ref
                              .read(userProvider.notifier)
                              .getUser(UserParams(role: state[i].role));
                          tabRole(state[i].role);
                        },
                      ),
                    ),
                ],
              ),
            ],
          ),
          Row(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Container(
                      width: 10,
                      height: 10,
                      decoration: const ShapeDecoration(
                        color: SUB01_COLOR,
                        shape: OvalBorder(),
                      ),
                    ),
                    const SizedBox(width: 4),
                    const Text(
                      '근무중',
                      style: TextStyle(
                        color: GREY_700_COLOR,
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 20),
              Container(
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Container(
                      width: 10,
                      height: 10,
                      decoration: const ShapeDecoration(
                        color: GREY_400_COLOR,
                        shape: OvalBorder(),
                      ),
                    ),
                    const SizedBox(width: 4),
                    const Text(
                      '오프',
                      style: TextStyle(
                        color: GREY_700_COLOR,
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
