import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:go_router/go_router.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/employee/views/employee_screen.dart';
import 'package:gym/helth/views/helth_screen.dart';
import 'package:gym/membership/views/membership_screen.dart';

class SideBar extends StatelessWidget {
  const SideBar({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final routerName = GoRouter.of(context).location;

    return Container(
      width: 98,
      height: double.infinity,
      color: PRIMARY_COLOR,
      child: Wrap(
        direction: Axis.horizontal,
        alignment: WrapAlignment.center,
        runAlignment: WrapAlignment.spaceBetween,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 32.0, bottom: 32.0),
            child: SvgPicture.asset('asset/img/image/logo.svg'),
          ),
          Column(
            children: [
              InkWell(
                onTap: () {
                  // context.goNamed(DashBoardScreen.routeName);
                },
                child: Container(
                  decoration: BoxDecoration(
                    color: routerName == 'dash' ? Colors.greenAccent : null,
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  width: 50,
                  height: 50,
                  child: SvgPicture.asset(
                    'asset/svg/icon/outline/dash.svg',
                    width: 24,
                    height: 24,
                    fit: BoxFit.scaleDown,
                  ),
                ),
              ),
              const SizedBox(height: 8.0),
              InkWell(
                onTap: () {
                  print(routerName);
                  context.goNamed(MembershipScreen.routeName);
                },
                child: Container(
                  decoration: BoxDecoration(
                    color: routerName == '/${MembershipScreen.routeName}'
                        ? Colors.greenAccent
                        : null,
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  width: 50,
                  height: 50,
                  child: SvgPicture.asset(
                    'asset/svg/icon/outline/member.svg',
                    width: 24,
                    height: 24,
                    fit: BoxFit.scaleDown,
                  ),
                ),
              ),
              const SizedBox(height: 8.0),
              InkWell(
                onTap: () {
                  context.goNamed(HelthScreen.routeName);
                },
                child: Container(
                  decoration: BoxDecoration(
                    color: routerName == '/${HelthScreen.routeName}'
                        ? Colors.greenAccent
                        : null,
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  width: 50,
                  height: 50,
                  child: SvgPicture.asset(
                    'asset/svg/icon/outline/helth.svg',
                    width: 24,
                    height: 24,
                    fit: BoxFit.scaleDown,
                  ),
                ),
              ),
              const SizedBox(height: 8.0),
              InkWell(
                onTap: () {
                  context.goNamed(EmployeeScreen.routeName);
                },
                child: Container(
                  decoration: BoxDecoration(
                    color: routerName == '/${EmployeeScreen.routeName}'
                        ? Colors.greenAccent
                        : null,
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  width: 50,
                  height: 50,
                  child: SvgPicture.asset(
                    'asset/svg/icon/outline/user-edit.svg',
                    width: 24,
                    height: 24,
                    fit: BoxFit.scaleDown,
                  ),
                ),
              ),
              const SizedBox(height: 8.0),
              InkWell(
                onTap: () {
                  // context.goNamed(GraphScreen.routeName);
                },
                child: Container(
                  decoration: BoxDecoration(
                    // color: routerName == '/${GraphScreen.routeName}'
                    //     ? Colors.greenAccent
                    //     : null,
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  width: 50,
                  height: 50,
                  child: SvgPicture.asset(
                    'asset/svg/icon/outline/graph.svg',
                    width: 24,
                    height: 24,
                    fit: BoxFit.scaleDown,
                  ),
                ),
              ),
              const SizedBox(height: 8.0),
              InkWell(
                onTap: () {
                  // context.goNamed(SettingScreen.routeName);
                },
                child: Container(
                  decoration: BoxDecoration(
                    // color: routerName == '/${SettingScreen.routeName}'
                    //     ? Colors.greenAccent
                    //     : null,
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  width: 50,
                  height: 50,
                  child: SvgPicture.asset(
                    'asset/svg/icon/outline/setting.svg',
                    width: 24,
                    height: 24,
                    fit: BoxFit.scaleDown,
                  ),
                ),
              ),
            ],
          ),
          Column(
            children: [
              const Divider(
                color: Colors.white,
                indent: 20,
                endIndent: 20,
              ),
              const SizedBox(height: 32),
              InkWell(
                onTap: () {},
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 32.0),
                  child: Container(
                    decoration: BoxDecoration(
                      // color: Colors.greenAccent,
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    width: 50,
                    height: 50,
                    child: SvgPicture.asset(
                      'asset/svg/icon/outline/logout.svg',
                      width: 24,
                      height: 24,
                      fit: BoxFit.scaleDown,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
