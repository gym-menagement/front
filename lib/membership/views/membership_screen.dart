import 'package:flutter/material.dart';
import 'package:gym/common/component/layout/default_layout.dart';
import 'package:gym/common/component/main/current_situation.dart';
import 'package:gym/membership/views/membership_home.dart';
import 'package:gym/common/component/main/sidebar.dart';

class MembershipScreen extends StatelessWidget {
  static String get routeName => 'membership';

  const MembershipScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const DefalutLayout(
      child: SafeArea(
        top: true,
        bottom: false,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            SideBar(),
            Expanded(
              child: MembershipHome(),
            ),
            CurrentSituation(),
          ],
        ),
      ),
    );
  }
}
