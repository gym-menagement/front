import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/svg.dart';
import 'package:gym/common/component/unit/round_button.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/employee/provider/role_provider.dart';

class EmployeeSettingBar extends ConsumerWidget {
  const EmployeeSettingBar({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(roleProvider);

    return SizedBox(
      width: double.infinity,
      height: 28,
      child: Wrap(
        // mainAxisSize: MainAxisSize.min,
        // mainAxisAlignment: MainAxisAlignment.spaceBetween,
        // crossAxisAlignment: CrossAxisAlignment.center,
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
                  const RoundButton(
                    colors: PRIMARY_COLOR,
                    borderColor: PRIMARY_COLOR,
                    name: 'ALL',
                  ),
                  for (int i = 0; i < state.length; i++)
                    Padding(
                      padding: const EdgeInsets.only(left: 8.0),
                      child: RoundButton(
                        textColor: PRIMARY_COLOR,
                        borderColor: PRIMARY_COLOR,
                        name: state[i].name,
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
