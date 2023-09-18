import 'package:flutter/material.dart';
import 'package:gym/employee/component/member_list_card.dart';

class MemberList extends StatelessWidget {
  const MemberList({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      child: const Column(
        children: [
          Row(
            children: [
              MemberListCard(),
              SizedBox(width: 8),
              MemberListCard(),
              SizedBox(width: 8),
              MemberListCard(),
              SizedBox(width: 8),
              MemberListCard(),
              SizedBox(width: 8),
            ],
          )
        ],
      ),
    );
  }
}
