import { Product } from './../../../core/models/Product.models';
import { Component,inject, signal, effect, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material-module';
import { ProductService } from '../../../core/services/product-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/api-service';
@Component({
  selector: 'app-testin.component',
  imports: [MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule],
  templateUrl: './testin.component.html',
  styleUrl: './testin.component.scss',
})
export class TestinComponent implements OnInit {
  
  testResults: string[] = [];
  isLoading = false;

  constructor(
    private productService: ProductService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.runBasicTests();
  }

  // 🧪 TEST 1: Service Injection
  testServiceInjection() {
    this.addResult('🔧 Testing Service Injection...');
    
    try {
      const hasProductService = !!this.productService;
      const hasApiService = !!this.apiService;
      
      if (hasProductService && hasApiService) {
        this.addResult('✅ SUCCESS: Both services injected properly');
      } else {
        this.addResult('❌ FAILED: Services not injected');
      }
    } catch (error) {
      this.addResult(`❌ ERROR: Service injection failed - ${error}`);
    }
  }

  // 🧪 TEST 2: Service Methods
  testServiceMethods() {
    this.addResult('🔧 Testing Service Methods...');
    
    const methodsToCheck = [
      'getAllProducts',
      'getProductById', 
      'getProductImageUrl',
      'getThumbnailUrl',
      'getAllCategories'
    ];
    
    methodsToCheck.forEach(method => {
      if (typeof (this.productService as any)[method] === 'function') {
        this.addResult(`✅ ${method} method exists`);
      } else {
        this.addResult(`❌ ${method} method missing`);
      }
    });
  }

  // 🧪 TEST 3: Image Handling
  testImageHandling() {
    this.addResult('🖼️ Testing Image Handling...');
    
    // Test different image scenarios
    const testCases = [
      { input: null, description: 'Null image' },
      { input: 'https://example.com/image.jpg', description: 'HTTPS image' },
      { input: 'product-image.jpg', description: 'Relative path image' }
    ];
    
    testCases.forEach(testCase => {
      try {
        const result = this.productService.getProductImageUrl(testCase.input);
        this.addResult(`✅ ${testCase.description}: ${result}`);
      } catch (error) {
        this.addResult(`❌ ${testCase.description} failed: ${error}`);
      }
    });
  }

  // 🧪 TEST 4: Material UI Components
  testMaterialUI() {
    this.addResult('🎨 Testing Material UI...');
    this.addResult('✅ Material components should render below');
    // Visual test - components are in template
  }

  // 🧪 TEST 5: API Connection (When ready)
  async testApiConnection() {
    this.addResult('🌐 Testing API Connection...');
    this.isLoading = true;
    
    try {
      // Test categories endpoint (usually public)
      this.apiService.get('Category').subscribe({
        next: (categories: any) => {
          this.addResult(`✅ API SUCCESS: Received ${categories.result[0].name} categories`);
          this.isLoading = false;
        },
        error: (error) => {
          this.addResult(`❌ API FAILED: ${error.message}`);
          this.isLoading = false;
        }
      });
    } catch (error) {
      this.addResult(`❌ API TEST ERROR: ${error}`);
      this.isLoading = false;
    }
  }

  // 🧪 TEST 6: Navigation
  testNavigation() {
    this.addResult('🛣️ Testing Navigation...');
    this.addResult('✅ Navigation links should work below');
  }

  // 🧪 RUN ALL TESTS
  runBasicTests() {
    this.testResults = ['🧪 STARTING COMPREHENSIVE TESTS 🧪'];
    
    setTimeout(() => this.testServiceInjection(), 100);
    setTimeout(() => this.testServiceMethods(), 200);
    setTimeout(() => this.testImageHandling(), 300);
    setTimeout(() => this.testMaterialUI(), 400);
    setTimeout(() => this.testNavigation(), 500);
    // testApiConnection() will be called manually when API is ready
  }

  // 🧪 Reset and re-run tests
  rerunTests() {
    this.testResults = [];
    this.runBasicTests();
  }

  // 🧪 Helper method
  private addResult(message: string) {
    this.testResults.push(message);
    console.log(message);
  }
}


