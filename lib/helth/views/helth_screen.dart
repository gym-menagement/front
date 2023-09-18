import 'package:flutter/material.dart';
import 'package:gym/common/component/layout/default_layout.dart';
import 'package:gym/helth/views/helth_home.dart';
import 'package:gym/common/component/main/current_situation.dart';
import 'package:gym/common/component/main/sidebar.dart';

class HelthScreen extends StatelessWidget {
  static String get routeName => 'helth';

  const HelthScreen({super.key});

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
              child: HelthHome(),
            ),
            CurrentSituation(),
          ],
        ),
      ),
    );
  }
}
