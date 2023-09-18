import 'package:flutter/material.dart';
import 'package:gym/common/component/calendar_pick.dart';
import 'package:gym/common/const/colors.dart';

class TicketStop extends StatelessWidget {
  const TicketStop({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          const CalendarPick(),
          const SizedBox(height: 30),
          const VerticalDivider(),
          const SizedBox(height: 30),
          Container(
            width: 280,
            height: 56,
            padding:
                const EdgeInsets.symmetric(vertical: 8.0, horizontal: 20.0),
            decoration: ShapeDecoration(
              color: BG_ITBLUE_COLOR,
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(4)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  "정지 일수",
                  style: TextStyle(
                    color: GREY_900_COLOR,
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    height: 0,
                  ),
                ),
                Container(
                  width: 60,
                  height: 40,
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  decoration: ShapeDecoration(
                    color: Colors.white,
                    shape: RoundedRectangleBorder(
                      side: const BorderSide(width: 1, color: GREY_400_COLOR),
                      borderRadius: BorderRadius.circular(4),
                    ),
                  ),
                  child: const Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '10',
                        style: TextStyle(
                          color: GREY_900_COLOR,
                          fontSize: 14,
                          fontFamily: 'Outfit',
                          fontWeight: FontWeight.w400,
                          height: 0,
                          // letterSpacing: -0.50,
                        ),
                      ),
                    ],
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
