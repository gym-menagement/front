import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:gym/common/component/calendar_pick.dart';
import 'package:gym/common/component/dialog/action_action.dart';
import 'package:gym/common/component/dialog/action_content.dart';
import 'package:gym/common/component/dialog/action_dialog.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/modal/rocker_room.dart';

class CalendarButton extends StatelessWidget {
  const CalendarButton({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        InkWell(
          onTap: () {
            ActionDialog(
              context,
              const ActionContent(
                sizedBoxWidth: 380,
                sizedBoxHeight: 603,
                child: CalendarPick(),
              ),
              ActionAction(
                nextFunc: () {
                  Navigator.of(context).pop();
                },
              ),
            );
          },
          child: Container(
            width: 130,
            decoration: BoxDecoration(
              border: Border.all(color: GREY_400_COLOR),
              borderRadius: const BorderRadius.all(
                Radius.circular(4),
              ),
            ),
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    "시작일",
                    style: TextStyle(
                      color: GREY_400_COLOR,
                    ),
                  ),
                  SvgPicture.asset(
                    'asset/svg/icon/calendar.svg',
                    width: 24,
                    height: 24,
                    fit: BoxFit.scaleDown,
                  ),
                ],
              ),
            ),
          ),
        ),
        Container(
          width: 130,
          decoration: BoxDecoration(
            border: Border.all(color: GREY_400_COLOR),
            borderRadius: const BorderRadius.all(
              Radius.circular(4),
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  "종료일",
                  style: TextStyle(
                    color: GREY_400_COLOR,
                  ),
                ),
                SvgPicture.asset(
                  'asset/svg/icon/calendar.svg',
                  width: 24,
                  height: 24,
                  fit: BoxFit.scaleDown,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
