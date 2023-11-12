import 'package:json_annotation/json_annotation.dart';

part 'membership_params.g.dart';

@JsonSerializable()
class MembershipParams {
  
  final int? id;
  final int? gym;
  final int? user;
  final String? name;
  final int? sex;
  final String? birth;
  final String? phonenum;
  final String? address;
  final String? image;
  final String? date;

  const MembershipParams({
    
    this.id,
    this.gym,
    this.user,
    this.name,
    this.sex,
    this.birth,
    this.phonenum,
    this.address,
    this.image,
    this.date,
  });

  factory MembershipParams.fromJson(Map<String, dynamic> json) =>
      _$MembershipParamsFromJson(json);

  Map<String, dynamic> toJson() => _$MembershipParamsToJson(this);
}
