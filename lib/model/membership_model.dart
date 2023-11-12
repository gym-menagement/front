import 'package:json_annotation/json_annotation.dart';

part 'membership_model.g.dart';

@JsonSerializable()
class MembershipModel {
  
  final int id;
  final int gym;
  final int user;
  final String name;
  final int sex;
  final String birth;
  final String phonenum;
  final String address;
  final String image;
  final String date;

  MembershipModel({
    
    required this.id,
    required this.gym,
    required this.user,
    required this.name,
    required this.sex,
    required this.birth,
    required this.phonenum,
    required this.address,
    required this.image,
    required this.date,
  });

  factory MembershipModel.fromJson(Map<String, dynamic> json) =>
      _$MembershipModelFromJson(json);
}
