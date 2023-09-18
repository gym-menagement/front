import 'package:flutter/material.dart';
import 'package:gym/common/const/colors.dart';

class EmployeeCard extends StatelessWidget {
  final String name;
  final String startDate;
  final String phoneNum;
  final bool working;

  const EmployeeCard({
    super.key,
    required this.name,
    required this.startDate,
    required this.phoneNum,
    required this.working,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 218,
      height: 120,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 19),
      decoration: BoxDecoration(
        border: Border.all(
          color: GREY_300_COLOR,
        ),
        borderRadius: BorderRadius.circular(8),
        color: WHITE_COLOR,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: double.infinity,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(
                  width: 80,
                  height: 80,
                  child: Stack(
                    children: [
                      Positioned(
                        left: 0,
                        top: 0,
                        child: Container(
                          width: 80,
                          height: 80,
                          decoration: ShapeDecoration(
                            image: const DecorationImage(
                              image: AssetImage(
                                  'asset/img/image/ddeok_bok_gi.jpg'),
                              fit: BoxFit.fill,
                            ),
                            shape: RoundedRectangleBorder(
                              side: BorderSide(
                                width: 6,
                                color: working
                                    ? const Color(0xFFFFEFFB)
                                    : GREY_100_COLOR,
                              ),
                              borderRadius: BorderRadius.circular(100),
                            ),
                          ),
                        ),
                      ),
                      Positioned(
                        left: 64,
                        top: 64,
                        child: Container(
                          width: 10,
                          height: 10,
                          decoration: ShapeDecoration(
                            color: working ? SUB01_COLOR : GREY_400_COLOR,
                            shape: const OvalBorder(),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Container(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(
                          width: double.infinity,
                          child: Text(
                            name,
                            style: const TextStyle(
                              color: GREY_900_COLOR,
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                        SizedBox(
                          width: double.infinity,
                          child: Text(
                            startDate,
                            style: const TextStyle(
                              color: GREY_400_COLOR,
                              fontSize: 11,
                              fontFamily: 'Outfit',
                              fontWeight: FontWeight.w400,
                              height: 0,
                            ),
                          ),
                        ),
                        const SizedBox(height: 6),
                        SizedBox(
                          width: double.infinity,
                          child: Text(
                            phoneNum,
                            style: const TextStyle(
                              color: GREY_700_COLOR,
                              fontSize: 12,
                              fontFamily: 'Outfit',
                              fontWeight: FontWeight.w400,
                            ),
                          ),
                        ),
                      ],
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
