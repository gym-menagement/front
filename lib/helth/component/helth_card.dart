import "package:flutter/material.dart";
import "package:gym/common/component/calendar_pick.dart";
import "package:gym/common/component/dialog/action_action.dart";
import "package:gym/common/component/dialog/action_content.dart";
import "package:gym/common/component/dialog/action_dialog.dart";
import "package:gym/common/const/colors.dart";
import "package:gym/modal/ticket_stop.dart";
import "package:gym/util/util.dart";

class HelthCard extends StatelessWidget {
  final String title;
  final int? discountPer;
  final int cost;
  final String? note;
  final double width;
  final double height;
  final Color color;
  final bool button;

  const HelthCard({
    super.key,
    required this.title,
    this.discountPer,
    required this.cost,
    this.note,
    this.width = 218,
    this.height = 110,
    this.color = WHITE_COLOR,
    this.button = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      padding: const EdgeInsets.symmetric(horizontal: 19, vertical: 15),
      decoration: ShapeDecoration(
        color: color,
        shape: RoundedRectangleBorder(
          side: const BorderSide(
            width: 1,
            color: GREY_300_COLOR,
          ),
          borderRadius: BorderRadius.circular(16),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(
            width: 85.0,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  width: double.infinity,
                  child: Text(
                    title,
                    style: const TextStyle(
                      color: GREY_900_COLOR,
                      fontSize: 14,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
                if (discountPer != null)
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: ShapeDecoration(
                      color: GREY_900_COLOR,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(100),
                      ),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Text(
                          '$discountPer%',
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 11,
                            fontFamily: 'Outfit',
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                      ],
                    ),
                  ),
              ],
            ),
          ),
          Container(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Container(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      if (discountPer != null)
                        Text(
                          '₩${numberUnit(cost)}',
                          style: const TextStyle(
                            color: GREY_500_COLOR,
                            fontSize: 12,
                            fontFamily: 'Outfit',
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                      Text(
                        discountPer != null
                            ? '₩${numberUnit(discountAmount(cost, discountPer))}'
                            : '₩${numberUnit(cost)}',
                        style: const TextStyle(
                          color: POINT_COLOR,
                          fontSize: 18,
                          fontFamily: 'Outfit',
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
                if (note != null) const SizedBox(height: 6),
                if (note != null)
                  Text(
                    note!,
                    style: const TextStyle(
                      color: GREY_700_COLOR,
                      fontSize: 11,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                if (button) const SizedBox(height: 6),
                if (button)
                  Container(
                    height: 32,
                    padding:
                        const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: ShapeDecoration(
                      color: const Color(0xFF212121),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(4)),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        InkWell(
                          onTap: () {
                            ActionDialog(
                              context,
                              const ActionContent(
                                sizedBoxWidth: 380,
                                sizedBoxHeight: 603,
                                child: TicketStop(),
                              ),
                              ActionAction(
                                nextFunc: () {
                                  Navigator.of(context).pop();
                                },
                              ),
                            );
                          },
                          child: const Text(
                            '정지',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 12,
                              fontFamily: 'Noto Sans KR',
                              fontWeight: FontWeight.w700,
                              height: 0,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
