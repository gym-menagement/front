import 'package:flutter/material.dart';
import 'package:gym/common/const/colors.dart';

class MemberUsedProduct extends StatelessWidget {
  const MemberUsedProduct({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 244,
      height: 62,
      decoration: BoxDecoration(
        color: WHITE_COLOR,
        border: Border.all(
          width: 1,
          color: GREY_300_COLOR,
        ),
        borderRadius: const BorderRadius.all(
          Radius.circular(4),
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "헬스 12개월",
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                    color: GREY_900_COLOR,
                  ),
                ),
                Row(
                  children: [
                    Text(
                      "종료일",
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                        color: GREY_500_COLOR,
                      ),
                    ),
                    Text(
                      "2024.08.24",
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        color: GREY_700_COLOR,
                      ),
                    ),
                    SizedBox(width: 8),
                    Text(
                      "담당",
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                        color: GREY_500_COLOR,
                      ),
                    ),
                    SizedBox(width: 4),
                    Text(
                      "박운동",
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        color: GREY_700_COLOR,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            Container(
              width: 50,
              height: 22,
              decoration: const BoxDecoration(
                borderRadius: BorderRadius.all(
                  Radius.circular(32),
                ),
                color: GREY_800_COLOR,
              ),
              child: const Center(
                child: Text(
                  "240일",
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    color: WHITE_COLOR,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
