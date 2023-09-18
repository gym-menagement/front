import 'package:flutter/material.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/helth/component/helth_card.dart';
import 'package:gym/membership/component/use/use_content_info.dart';

class TicketHistory extends StatelessWidget {
  const TicketHistory({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      child: const SizedBox(
        width: 220,
        height: 231,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            HelthCard(
              title: '헬스 1개월',
              cost: 420000,
              width: 220,
              height: 90,
              color: GREY_50_COLOR,
            ),
            UseContentInfo(),
          ],
        ),
      ),
    );
  }
}
