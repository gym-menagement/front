import 'package:flutter/material.dart';
import 'package:gym/common/component/layout/default_layout.dart';
import 'package:gym/common/component/main/current_situation.dart';
import 'package:gym/common/component/main/sidebar.dart';
import 'package:gym/employee/views/employee_home.dart';

class EmployeeScreen extends StatelessWidget {
  static String get routeName => 'employee';

  const EmployeeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const DefalutLayout(
      child: Scaffold(
        body: SafeArea(
          top: true,
          bottom: false,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              SideBar(),
              Expanded(child: EmployeeHome()),
              CurrentSituation(),
            ],
          ),
        ),
      ),
    );
  }
}
