import 'package:flutter/material.dart';
import 'package:gym/common/component/highlighted_text.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/common/component/main/member_card.dart';
import 'package:gym/membership/component/membership_list_card.dart';
import 'package:intl/intl.dart';

class CurrentSituation extends StatelessWidget {
  const CurrentSituation({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    DateTime dt = DateTime.now();

    return Container(
      width: 368,
      height: double.infinity,
      decoration: const BoxDecoration(
        color: WHITE_COLOR,
        boxShadow: [
          BoxShadow(
            // color: Colors.grey.withOpacity(0.2),
            color: Color(0x19000000),
            spreadRadius: 0.1,
            blurRadius: 10,
            offset: Offset(-10, 0),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 34.0, horizontal: 34.0),
        child: Wrap(
          direction: Axis.horizontal,
          alignment: WrapAlignment.center,
          children: [
            Column(
              children: [
                HighLightedText(
                  data: DateFormat('yyyy.MM.dd').format(dt),
                  color: const Color(0xFFE9EEFF),
                  fontSize: 22.0,
                ),
                const SizedBox(
                  height: 30,
                ),
                const MemberCard(),
              ],
            ),
            const SizedBox(
              height: 30.0,
              width: double.infinity,
            ),
            const Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text(
                  "Visitors",
                  style: TextStyle(
                    color: GREY_900_COLOR,
                    fontSize: 16.0,
                    fontFamily: 'Outfit',
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Row(
                  children: [
                    Text(
                      "Total",
                      style: TextStyle(
                        color: GREY_700_COLOR,
                        fontSize: 12.0,
                        fontFamily: 'Outfit',
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                    SizedBox(width: 4),
                    Text(
                      "24",
                      style: TextStyle(
                        color: PRIMARY_COLOR,
                        fontSize: 18.0,
                        fontFamily: 'Outfit',
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(
              height: 16.0,
              width: double.infinity,
            ),
            if (MediaQuery.of(context).size.height - 550 > 0)
              SizedBox(
                width: double.infinity,
                height: MediaQuery.of(context).size.height - 550,
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(bottom: 6.0),
                        child: MembershipListCard(
                          image: Image.asset(
                            'asset/img/image/ddeok_bok_gi.jpg',
                            width: 32,
                            height: 32,
                            fit: BoxFit.cover,
                          ),
                          name: '김아무개',
                          day: '2023.04.05',
                          endDay: '종료일',
                        ),
                      ),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
