import 'package:flutter/material.dart';
import 'package:gym/common/const/colors.dart';

class MemberListCard extends StatelessWidget {
  const MemberListCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 130,
      height: 125,
      padding: const EdgeInsets.all(12),
      decoration: ShapeDecoration(
        color: Colors.white,
        shape: RoundedRectangleBorder(
          side: const BorderSide(color: Color(0xFFE0E0E0)),
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: double.infinity,
            child: Row(
              children: [
                Container(
                  width: 24,
                  height: 24,
                  decoration: ShapeDecoration(
                    image: const DecorationImage(
                      image: AssetImage(
                        'asset/img/image/user-card.jpg',
                      ),
                      fit: BoxFit.cover,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
                const SizedBox(width: 4),
                const Text(
                  '김아무개',
                  style: TextStyle(
                    color: GREY_900_COLOR,
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                    height: 0,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 2),
          const SizedBox(
            width: double.infinity,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text(
                  '트레이너',
                  style: TextStyle(
                    color: GREY_400_COLOR,
                    fontSize: 11,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                SizedBox(width: 2),
                SizedBox(
                  child: Text(
                    '아이유',
                    style: TextStyle(
                      color: GREY_600_COLOR,
                      fontSize: 11,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 2),
          const SizedBox(
            width: double.infinity,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  width: double.infinity,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        '시작',
                        style: TextStyle(
                          color: GREY_400_COLOR,
                          fontSize: 11,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                      SizedBox(width: 2),
                      SizedBox(
                        child: Text(
                          '2023.04.05',
                          style: TextStyle(
                            color: GREY_600_COLOR,
                            fontSize: 11,
                            fontFamily: 'Outfit',
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 2),
                SizedBox(
                  width: double.infinity,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        '종료',
                        style: TextStyle(
                          color: GREY_400_COLOR,
                          fontSize: 11,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                      SizedBox(width: 2),
                      SizedBox(
                        child: Text(
                          '2023.04.05',
                          style: TextStyle(
                            color: GREY_600_COLOR,
                            fontSize: 11,
                            fontFamily: 'Outfit',
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 2),
                SizedBox(
                  width: double.infinity,
                  child: SizedBox(
                    child: Text(
                      '잔여 60일',
                      style: TextStyle(
                        color: GREY_900_COLOR,
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
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
