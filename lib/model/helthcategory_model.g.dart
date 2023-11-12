// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'helthcategory_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

HelthcategoryModel _$HelthcategoryModelFromJson(Map<String, dynamic> json) =>
    HelthcategoryModel(
      id: json['id'] as int,
      gym: json['gym'] as int,
      name: json['name'] as String,
      date: json['date'] as String,
    );

Map<String, dynamic> _$HelthcategoryModelToJson(HelthcategoryModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'name': instance.name,
      'date': instance.date,
    };
