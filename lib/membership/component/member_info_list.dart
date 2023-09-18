import 'package:flutter/material.dart';
import 'package:gym/common/const/colors.dart';

class MemberInfoList extends StatelessWidget {
  final String name;
  final String phoneNum;
  final String startDate;
  final String endDate;
  final int remainDay;
  final String status;
  final VoidCallback clickRow;

  const MemberInfoList({
    super.key,
    required this.name,
    required this.phoneNum,
    required this.startDate,
    required this.endDate,
    required this.remainDay,
    required this.status,
    required this.clickRow,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: clickRow,
      child: Column(
        children: [
          SizedBox(
            height: 44,
            child: Row(
              children: [
                Expanded(
                  child: Container(
                    child: Center(
                      child: Text(
                        name,
                        style: const TextStyle(
                          color: GREY_600_COLOR,
                          fontSize: 14.0,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: Container(
                    child: Center(
                        child: Text(
                      phoneNum,
                      style: const TextStyle(
                        color: GREY_600_COLOR,
                        fontSize: 14.0,
                        fontWeight: FontWeight.w500,
                      ),
                    )),
                  ),
                ),
                Expanded(
                  child: Container(
                    child: Center(
                      child: Text(
                        startDate,
                        style: const TextStyle(
                          color: GREY_900_COLOR,
                          fontSize: 14.0,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: Container(
                    child: Center(
                      child: Text(
                        endDate,
                        style: const TextStyle(
                          color: GREY_900_COLOR,
                          fontSize: 14.0,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: Container(
                    child: Center(
                      child: Text(
                        '$remainDay',
                        style: const TextStyle(
                          color: GREY_900_COLOR,
                          fontSize: 14.0,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: Container(
                    child: Center(
                      child: Text(
                        status,
                        style: const TextStyle(
                          color: GREY_900_COLOR,
                          fontSize: 14.0,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const Divider(
            color: GREY_200_COLOR,
            thickness: 1,
          ),
        ],
      ),
    );
  }
}
